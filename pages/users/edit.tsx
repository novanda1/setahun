import { Button, HelperText, Input, Label } from "@roketid/windmill-react-ui";
import { plainToClass } from "class-transformer";
import createValidator from "class-validator-formik";
import PageTitle from "components/Typography/PageTitle";
import Layout from "containers/Layout";
import { Formik } from "formik";
import useEditUser from "hooks/useEditUser";
import { getRoleByRequest, getUserByRequest } from "lib/api/utils";
import { supabase } from "lib/supabase";
import { UpdateUserDTO } from "lib/types/User";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const EditUser: React.FC<any> = ({ role, user }) => {
  let initialValues;
  if (user) initialValues = plainToClass(UpdateUserDTO, user);
  else initialValues = new UpdateUserDTO();

  // const [errorMessage, setErrorMessage] = useState("");

  const editUser = useEditUser();
  const { push, back } = useRouter();

  useEffect(() => {
    async function logout() {
      await supabase.auth.signOut();
      push("/login");
    }

    if (!user) {
      logout();
    }
  }, [user, push]);

  return (
    <Layout role={role}>
      <Head>
        <title>Edit {user.fullname} - Setahun</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full mx-auto">
        <PageTitle>Ubah User</PageTitle>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = createValidator(UpdateUserDTO)(values);

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            editUser.mutate(values, {
              onError: (err) => {
                setSubmitting(false);
              },
              onSettled(data, error, variables, context) {
                setSubmitting(false);
                push("/users");
              },
            });
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
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="pb-7">
              <Label className="mt-4">
                <span>Nama Lengkap</span>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullname || ""}
                  name="fullname"
                  className="mt-1"
                />
              </Label>
              {errors.fullname && touched.fullname && (
                <HelperText valid={false}>{errors.fullname}</HelperText>
              )}

              <Label className="mt-4">
                <span>NIP</span>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nip || ""}
                  name="nip"
                  type="number"
                  className="mt-1"
                />
              </Label>
              {errors.nip && touched.nip && (
                <HelperText valid={false}>{errors.nip}</HelperText>
              )}

              <Label className="mt-4">
                <span>Unit</span>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="unit"
                  value={values.unit || ""}
                  type="text"
                  className="mt-1"
                />
              </Label>
              {errors.unit && touched.unit && (
                <HelperText valid={false}>{errors.unit}</HelperText>
              )}

              <div className="mt-4">
                {/* TODO: Check if this label is accessible, or fallback */}
                {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
                <Label id="tipe-user">Tipe User</Label>
                <div className="mt-2" role="group" aria-labelledby="tipe-user">
                  <Label radio>
                    <Input
                      type="radio"
                      value="read-only"
                      name="role"
                      checked={values.role === "read-only"}
                      onChange={() => setFieldValue("role", "read-only")}
                      disabled={values.role === "admin"}
                    />
                    <span className="ml-2">Read only</span>
                  </Label>
                  <Label radio>
                    <Input
                      className="ml-6"
                      type="radio"
                      value="moderator"
                      name="role"
                      checked={values.role === "moderator"}
                      onChange={() => setFieldValue("role", "moderator")}
                      disabled={values.role === "admin"}
                    />
                    <span className="ml-2">Moderator</span>
                  </Label>
                  {values.role === "admin" && (
                    <Label radio>
                      <Input
                        className="ml-6"
                        type="radio"
                        value="moderator"
                        name="role"
                        checked={values.role === "admin"}
                      />
                      <span className="ml-2">Admin</span>
                    </Label>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap mt-10 pb-11 justify-end gap-3">
                <div className="hidden sm:block">
                  <Button type="button" onClick={back} layout="outline">
                    Batal
                  </Button>
                </div>
                <div className="hidden sm:block">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Memproses..." : "Simpan"}
                  </Button>
                </div>
                <div className="block w-full sm:hidden">
                  <Button
                    type="button"
                    onClick={back}
                    block
                    size="large"
                    layout="outline"
                  >
                    Batal
                  </Button>
                </div>
                <div className="block w-full sm:hidden">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    block
                    size="large"
                  >
                    {isSubmitting ? "Memproses..." : "Simpan"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = (await getUserByRequest(context)) || null;
  const role = await getRoleByRequest(context);

  const cookies = await supabase.auth.api.getUserByCookie(
    context.req,
    context.res
  );

  if (!user && cookies.token) await supabase.auth.api.signOut(cookies.token);

  return {
    props: {
      role,
      user,
    },
  };
};

export default EditUser;
