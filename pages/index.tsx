import 'reflect-metadata'
import 'es6-shim'

import React from 'react'
import PageTitle from '../components/Typography/PageTitle'
import Layout from '../containers/Layout'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { supabase } from 'lib/supabase'
import { getUserRole } from 'lib/jwt'

function Dashboard({ role }: any) {
  return (
    <Layout role={role}>
      <Head>
        <title>Dashboard - Setahun</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PageTitle>Dashboard</PageTitle>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { token } = await supabase.auth.api.getUserByCookie(req, res)
  const role = getUserRole(token)

  return {
    props: {
      role: role
    }
  }
}

export default Dashboard