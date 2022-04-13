import { supabase } from 'lib/supabase'
import withAuth from 'lib/withAuth'
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