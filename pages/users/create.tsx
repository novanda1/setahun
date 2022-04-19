import { Button, HelperText, Input, Label } from "@roketid/windmill-react-ui"
import PageTitle from "components/Typography/PageTitle"
import Layout from "containers/Layout"
import Cookies from "cookies"
import { Formik } from "formik"
import { getUserRole, updateToken } from "lib/jwt"
import { GetServerSideProps } from "next"

const CreateUser: React.FC<any> = ({ role }) => {
  return <Layout role={role}>
    <PageTitle>Tambah User</PageTitle>

    <div className="max-w-2xl">

      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          // if (!values.email) {
          //   errors.email = 'Email wajib diisi';
          // } else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          // ) {
          //   errors.email = 'Email salah';
          // }

          // if (!values.password) {
          //   errors.password = 'Password wajib diisi'
          // }

          // Object.keys(errors).forEach((key: string) => !errors[key as keyof LoginError] && delete errors[key as keyof LoginError])

          // return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // setSubmitting(true)
          // const { error } = await supabase.auth.signIn(values)
          // if (error && error.message === "Invalid login credentials") SetAuthError("Email atau password salah")
          // setSubmitting(false)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="pb-7">
            <Label>
              <span>Email</span>
              <Input
                className='mt-1 focus:border-blue-400 focus:ring-blue-300'
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder='john@doe.com'
              />
            </Label>
            {errors.email && touched.email && (
              <HelperText valid={false}>{errors.email}</HelperText>
            )}


            <Label className='mt-4'>
              <span>Password</span>
              <Input
                className='mt-1 focus:border-blue-400 focus:ring-blue-300'
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder='***************'
              />
            </Label>
            {errors.password && touched.password && (
              <HelperText valid={false}>{errors.password}</HelperText>
            )}
            <Button type='submit' className='mt-10 w-max' disabled={isSubmitting} block>
              {isSubmitting ? "Memproses..." : "Masuk"}
            </Button>
            {
              // authError &&
              // <HelperText className='text-center block mt-2' valid={false}>{authError}</HelperText>
            }
          </form>
        )}
      </Formik>
    </div>

  </Layout>
}
export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const cookies = new Cookies(req, res)
  let role = ''

  const token = cookies.get('sb-access-token') || query.token as string || ''
  if (token)
    try {
      role = getUserRole(token)
    }
    catch {
      const newToken = await updateToken(req, res)
      role = getUserRole(newToken)
    }


  return {
    props: {
      role: role
    }
  }
}

export default CreateUser