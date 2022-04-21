import {
  Button,
  HelperText,
  Input,
  Label,
  WindmillContext,
} from "@roketid/windmill-react-ui";
import { Formik } from "formik";
import { supabase } from "lib/supabase";
import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";

type LoginError = { email: string; password: string };

function LoginPage() {
  const { mode } = useContext(WindmillContext);
  const imgSource =
    mode === "dark" ? "/assets/img/login.jpg" : "/assets/img/login.jpg";
  const user = supabase.auth.user();
  const [authError, SetAuthError] = useState<string>("");

  return (
    <>
      <Head>
        <title>Login - Setahun</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="relative h-32 md:h-auto md:w-1/2">
              <Image
                aria-hidden="true"
                className="hidden object-cover w-full h-full"
                src={imgSource}
                alt="Office"
                layout="fill"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Masuk
                </h1>

                <Formik
                  initialValues={{ email: "", password: "" }}
                  validate={(values) => {
                    const errors: LoginError = { email: "", password: "" };
                    if (!values.email) {
                      errors.email = "Email wajib diisi";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Email salah";
                    }

                    if (!values.password) {
                      errors.password = "Password wajib diisi";
                    }

                    Object.keys(errors).forEach(
                      (key: string) =>
                        !errors[key as keyof LoginError] &&
                        delete errors[key as keyof LoginError]
                    );

                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    const { error } = await supabase.auth.signIn(values);
                    if (error && error.message === "Invalid login credentials")
                      SetAuthError("Email atau password salah");
                    setSubmitting(false);
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
                          className="mt-1 focus:border-blue-400 focus:ring-blue-300"
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
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
                          className="mt-1 focus:border-blue-400 focus:ring-blue-300"
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder="***************"
                        />
                      </Label>
                      {errors.password && touched.password && (
                        <HelperText valid={false}>{errors.password}</HelperText>
                      )}
                      <Button
                        type="submit"
                        className="mt-10"
                        disabled={isSubmitting || supabase.auth.user() !== null}
                        block
                      >
                        {isSubmitting
                          ? "Memproses..."
                          : supabase.auth.user() !== null
                          ? "Berhasil"
                          : "Masuk"}
                      </Button>
                      {authError && (
                        <HelperText
                          className="text-center block mt-2"
                          valid={false}
                        >
                          {authError}
                        </HelperText>
                      )}
                    </form>
                  )}
                </Formik>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

