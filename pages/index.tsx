import { supabase } from 'lib/supabase'
import React from 'react'
import PageTitle from '../components/Typography/PageTitle'
import Layout from '../containers/Layout'

function Dashboard() {
  return (
    <Layout>
      <PageTitle>Dashboard</PageTitle>


    </Layout>
  )
}

export default Dashboard

export async function getServerSideProps({ req }: any) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: '/login' } }
  }

  return { props: { user } }
}
