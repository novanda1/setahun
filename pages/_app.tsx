import { Windmill } from '@roketid/windmill-react-ui';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { UserProvider } from '@supabase/supabase-auth-helpers/react';
import type { AppProps } from 'next/app';
import React from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';



function MyApp({ Component, pageProps }: AppProps) {
  // suppress useLayoutEffect warnings when running outside a browser
  if (typeof window !== 'undefined') React.useLayoutEffect = React.useEffect;

  return (
    <UserProvider supabaseClient={supabaseClient}>
      <Windmill usePreferences={true}>
        <Component {...pageProps} />
      </Windmill>
    </UserProvider>
  )
}
export default MyApp
