import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Label, Input, WindmillContext } from '@roketid/windmill-react-ui'
import { GithubIcon, TwitterIcon } from 'icons'
import Button from 'components/Button'

function LoginPage() {
  const { mode } = useContext(WindmillContext)

  return (
    <div className='flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
      <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
          <div className='relative h-32 md:h-auto md:w-1/2'>
            <Image
              aria-hidden='true'
              className='hidden object-cover w-full h-full'
              src="https://images.unsplash.com/photo-1554904780-9ac4bdfa6a69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt='Office'
              layout='fill'
            />
          </div>
          <main className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
            <div className='w-full'>
              <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  className='mt-1'
                  type='email'
                  placeholder='john@doe.com'
                />
              </Label>

              <Label className='mt-4'>
                <span>Password</span>
                <Input
                  className='mt-1'
                  type='password'
                  placeholder='***************'
                />
              </Label>

              <Link href='/example' passHref={true}>
                <Button className='mt-4' block>
                  Log in
                </Button>
              </Link>

              <hr className='my-8' />

              <Button block layout='outline'>
                <GithubIcon className='w-4 h-4 mr-2' aria-hidden='true' />
                Github
              </Button>
              <Button className='mt-4' block layout='outline'>
                <TwitterIcon className='w-4 h-4 mr-2' aria-hidden='true' />
                Twitter
              </Button>

              <p className='mt-4'>
                <Link href='/example/forgot-password'>
                  <a className='text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline'>
                    Forgot your password?
                  </a>
                </Link>
              </p>
              <p className='mt-1'>
                <Link href='/example/create-account'>
                  <a className='text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline'>
                    Create account
                  </a>
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LoginPage
