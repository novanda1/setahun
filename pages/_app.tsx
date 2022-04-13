import { Windmill } from '@roketid/windmill-react-ui';
import { supabase } from 'lib/supabase';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // suppress useLayoutEffect warnings when running outside a browser
  if (typeof window === undefined) React.useLayoutEffect = React.useEffect;
  const [authenticatedState, setAuthenticatedState] = useState<'not-authenticated' | 'authenticated'>("not-authenticated")
  const { push } = useRouter()

  async function checkUser() {
    const user = await supabase.auth.user()
    if (user) {
      setAuthenticatedState('authenticated')
    }
  }
  async function handleAuthChange(event: any, session: any) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)
      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated')
        push('/')
      }
      if (event === 'SIGNED_OUT') {
        push('/login')
        setAuthenticatedState('not-authenticated')
      }
    })
    checkUser()
    return () => {
      authListener?.unsubscribe()
    }
  }, [push])

  return (
    <Windmill usePreferences={true}>
      <Component {...pageProps} />
    </Windmill>
  )
}
export default MyApp
