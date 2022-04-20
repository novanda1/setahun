import { Button, HelperText, Input, Label } from "@roketid/windmill-react-ui";
import createValidator from "class-validator-formik";
import PageTitle from "components/Typography/PageTitle";
import Layout from "containers/Layout";
import Cookies from "cookies";
import { Formik } from "formik";
import useCreateUser from "hooks/useCreateUser";
import { getUserRole, updateToken } from "lib/jwt";
import { CreateUserDTO, UserMetaData } from "lib/types/User";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateUser: React.FC<any> = ({ role }) => {
  const initialValues = new CreateUserDTO()
  initialValues.user_metadata = { fullname: "", nip: 0, unit: "" }

  const [errorMessage, setErrorMessage] = useState("")

  const createUser = useCreateUser()
  const { push } = useRouter()

  return (
    <Layout role={role}>
      <div className="w-full max-w-3xl mx-auto">
        <PageTitle>Tambah User </PageTitle>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = createValidator(CreateUserDTO)(values);
            const userMetadata = createValidator(UserMetaData)(values.user_metadata)

            if (!errors.passwordConfirm) {
              if (values.password !== values.passwordConfirm) {
                errors.passwordConfirm = "Pasword tidak sama"
              }
            }

            if (Object.keys(userMetadata).length)
              errors.user_metadata = userMetadata

            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            createUser.mutate(values, {
              onSettled: (data) => {
                const { status, message, error }: { status?: string, message?: string, error?: { message?: string } } = data
                if (status && !status?.toString()?.startsWith('2', 0)) {
                  message ? setErrorMessage(message) : null
                  error?.message ? setErrorMessage(error?.message) : null
                } else {
                  setErrorMessage('')
                  push('/users')
                }
                setSubmitting(false)
              }
            })
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            isSubmitting,
            handleChange,
          }) => (
            <form onSubmit={handleSubmit} className="pb-7">
              <Label>
                <span>Email</span>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 focus:border-blue-400 focus:ring-blue-300"
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="john@doe.com"
                />
              </Label>
              {errors.email && touched.email && (
                <HelperText valid={false}>{errors.email}</HelperText>
              )}

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 focus:border-blue-400 focus:ring-blue-300"
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="***************"
                />
              </Label>
              {errors.password && touched.password && (
                <HelperText valid={false}>{errors.password}</HelperText>
              )}

              <Label className="mt-4">
                <span>Konfirmasi Password</span>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  name="passwordConfirm"
                  value={values.passwordConfirm}
                  className="mt-1"
                  placeholder="rahasia"
                />
              </Label>
              {errors.passwordConfirm && touched.passwordConfirm && (
                <HelperText valid={false}>{errors.passwordConfirm}</HelperText>
              )}

              <Label className="mt-4">
                <span>Nama Lengkap</span>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.user_metadata.fullname || ""}
                  name="user_metadata.fullname"
                  className="mt-1"
                  placeholder="Sherly Ayu"
                />
              </Label>
              {errors.user_metadata?.fullname &&
                touched.user_metadata?.fullname && (
                  <HelperText valid={false}>
                    {errors.user_metadata.fullname}
                  </HelperText>
                )}

              <Label className="mt-4">
                <span>NIP</span>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.user_metadata.nip || ""}
                  name="user_metadata.nip"
                  type="number"
                  className="mt-1"
                  placeholder="123123123123"
                />
              </Label>
              {errors.user_metadata?.nip &&
                touched.user_metadata?.nip && (
                  <HelperText valid={false}>
                    {errors.user_metadata.nip}
                  </HelperText>
                )}

              <Label className="mt-4">
                <span>Unit</span>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="user_metadata.unit"
                  value={values.user_metadata.unit || ""}
                  type="text"
                  className="mt-1"
                  placeholder="Logistik"
                />
              </Label>
              {errors.user_metadata?.unit &&
                touched.user_metadata?.unit && (
                  <HelperText valid={false}>
                    {errors.user_metadata.unit}
                  </HelperText>
                )}



              <div className="mt-10 flex flex-col md:flex-row justify-between items-center">
                <HelperText valid={false}>
                  {errorMessage}
                </HelperText>
                <Button
                  type="submit"
                  className="mt-3 md:mt-0 w-max"
                  disabled={isSubmitting}
                  block
                >
                  {isSubmitting ? "Memproses..." : "Tambah User"}
                  {isSubmitting}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const cookies = new Cookies(req, res);
  let role = "";

  const token = cookies.get("sb-access-token") || (query.token as string) || "";
  if (token)
    try {
      role = getUserRole(token);
    } catch {
      const newToken = await updateToken(req, res);
      role = getUserRole(newToken);
    }

  return {
    props: {
      role: role,
    },
  };
};

export default CreateUser;

