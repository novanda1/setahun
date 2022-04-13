import { useUser, Auth as SupabaseAuth } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const Auth = () => {
  const [f, setF] = useState<boolean>(true)
  const [s, setS] = useState<boolean>(true)
  const ref = useRef<any>()

  useEffect(() => {
    const forgotPassEl = document.querySelector('[href="#auth-forgot-password"]')
    const signUpEl = document.querySelector('[href="#auth-sign-up"]')

    ref.current = signUpEl

    if (forgotPassEl) {
      forgotPassEl.remove()
    }

    if (signUpEl) {
      signUpEl.remove()
    }

    console.log('ref', ref)
    console.log('typeof window', typeof window)

    setS(false)
  }, [typeof window])

  if (!s)
    return (
      <SupabaseAuth
        view='sign_in'
        supabaseClient={supabaseClient}
        className=""
      />
    )

  return <div className='h-96'></div>
}

export default Auth;