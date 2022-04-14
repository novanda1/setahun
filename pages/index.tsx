import 'reflect-metadata'
import 'es6-shim'

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