import '../styles/globals.css'
import 'tailwindcss/tailwind.css';

import React from 'react'
import { Windmill } from '@roketid/windmill-react-ui'
import type { AppProps } from 'next/app'

import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'

function MyApp({ Component, pageProps }: AppProps) {
  // suppress useLayoutEffect warnings when running outside a browser
  if (!typeof window) React.useLayoutEffect = React.useEffect;

  return (
       <UserProvider supabaseClient={supabaseClient}>
          <Windmill usePreferences={true}>
            <Component {...pageProps} />
          </Windmill>
       </UserProvider>
  )
}
export default MyApp
