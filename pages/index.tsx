import { supabase } from 'lib/supabase'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import Layout from '../containers/Layout'

function Dashboard() {
  const { replace } = useRouter()
  const user = supabase.auth.user()
  // go to login if not authenticated
  useEffect(() => {
    if (!user) replace('login')
  }, [replace, user])

  if (!user) return <></>
  else
    return (
      <Layout>
        <PageTitle>Dashboard</PageTitle>


      </Layout>
    )
}

export default Dashboard
