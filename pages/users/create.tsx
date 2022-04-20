import { Button, HelperText, Input, Label } from "@roketid/windmill-react-ui"
import { validate } from "class-validator"
import PageTitle from "components/Typography/PageTitle"
import Layout from "containers/Layout"
import Cookies from "cookies"
import { Formik } from "formik"
import produce from "immer"
import { getUserRole, updateToken } from "lib/jwt"
import { CreateUserDTO } from "lib/types/User"
import { GetServerSideProps } from "next"
import { useCallback, useState } from "react"

const CreateUser: React.FC<any> = ({ role }) => {
  const [createUserInput, setCreateUserInput] = useState<CreateUserDTO>(
    {
      email: '',
      password: '',
      passwordConfirm: '',
      user_metadata:
      {
        fullname: '',
        nip: 0,
        unit: ''
      }
    }
  )
  const onInputChange = useCallback((e) => {
    setCreateUserInput(
      produce((draft: any) => {
        const obj = e.target.name.split('.')
        if (obj.length === 2)
          draft[obj[0]][obj[1]] = e.target.value
        else
          draft[obj[0]] = e.target.value
      })
    )
  }, [])

  return <Layout role={role}>
    <div className="max-w-4xl">
      <PageTitle>Tambah User</PageTitle>
      <Formik
        initialValues={new CreateUserDTO()}
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

          let errors: any = new CreateUserDTO();

          validate(values).then((ers: any) => {
            console.log('errors', ers)
            // errors[ers.property] = ers.constrains[Object.keys(obj)[0]];
          })

          // console.log('errors', errors)

          errors.password = 'asd'

          return errors

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
            {JSON.stringify(errors)}
            <Label className='mt-4'>
              <span>Email</span>
              <Input
                name="email"
                value={createUserInput.email}
                onChange={onInputChange}
                type="email"
                className="mt-1"
                placeholder="sherlyayu@gmail.com" />
            </Label>
            {errors.email && touched.email && (
              <HelperText valid={false}>{errors.email}</HelperText>
            )}

            <Label className='mt-4'>
              <span>Password</span>
              <Input
                name="password"
                value={createUserInput.password}
                onChange={onInputChange}
                type="password"
                className="mt-1"
                placeholder="rahasia" />
            </Label>
            {errors.passwordConfirm && touched.passwordConfirm && (
              <HelperText valid={false}>{errors.passwordConfirm}</HelperText>
            )}

            <Label className='mt-4'>
              <span>Konfirmasi Password</span>
              <Input type="password" className="mt-1" placeholder="rahasia" />
            </Label>
            {errors.password && touched.password && (
              <HelperText valid={false}>{errors.password}</HelperText>
            )}

            <Label className='mt-4'>
              <span>Nama Lengkap</span>
              <Input
                value={createUserInput.user_metadata.fullname}
                name='user_metadata.fullname'
                onChange={onInputChange}
                className="mt-1"
                placeholder="Sherly Ayu" />
            </Label>
            {errors.user_metadata?.fullname && touched.user_metadata?.fullname && (
              <HelperText valid={false}>{errors.user_metadata?.fullname}</HelperText>
            )}

            <Label className='mt-4'>
              <span>NIP</span>
              <Input
                value={createUserInput.user_metadata.nip || ''}
                name="user_metadata.nip"
                onChange={onInputChange}
                type="number"
                className="mt-1"
                placeholder="123123123123" />
            </Label>
            {errors.user_metadata?.nip && touched.user_metadata?.nip && (
              <HelperText valid={false}>{errors.user_metadata?.nip}</HelperText>
            )}

            <Label className='mt-4'>
              <span>Unit</span>
              <Input
                name="user_metadata.unit"
                value={createUserInput.user_metadata.unit}
                onChange={onInputChange}
                type="text"
                className="mt-1"
                placeholder="Logistik" />
            </Label>
            {errors.user_metadata?.unit && touched.user_metadata?.unit && (
              <HelperText valid={false}>{errors.user_metadata?.unit}</HelperText>
            )}

            <Button type='submit' className='mt-10 w-max ml-auto' disabled={isSubmitting} block>
              {isSubmitting ? "Memproses..." : "Tambah"}
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