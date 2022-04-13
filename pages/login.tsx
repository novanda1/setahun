import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Label, Input, Button, WindmillContext } from '@roketid/windmill-react-ui'
import { GithubIcon, TwitterIcon } from 'icons'

import { useUser } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import Auth from 'components/Auth'


function LoginPage() {
  const { mode } = useContext(WindmillContext)
  const imgSource = mode === 'dark' ? '/assets/img/login-office-dark.jpeg' : '/assets/img/login-office.jpeg'
  const { user, error } = useUser()
  const [data, setData] = useState<any>({})


  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*')
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])


  if (!user)
    return (
      <>
        <div className='flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
          <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
            <div className='flex flex-col overflow-y-auto md:flex-row'>
              <div className='relative h-32 md:h-auto md:w-1/2'>
                <Image
                  aria-hidden='true'
                  className='hidden object-cover w-full h-full'
                  src={imgSource}
                  alt='Office'
                  layout='fill'
                />
              </div>
              <main className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
                <div className='w-full'>
                  <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
                    Login
                  </h1>

                  {error && <p>{error.message}</p>}
                  <Auth />
                </div>
              </main>
            </div>
          </div>
        </div>
        );
      </>
    )
  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )

}

export default LoginPage
