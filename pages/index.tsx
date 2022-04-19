import 'reflect-metadata'
import 'es6-shim'

import React from 'react'
import PageTitle from '../components/Typography/PageTitle'
import Layout from '../containers/Layout'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { supabase } from 'lib/supabase'

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
  const user = await supabase.auth.api.getUserByCookie(req);
  if (user?.token) {
    supabase.auth.setAuth(user.token);
  }

  const { data } = await supabase
    .from("user_roles")
    .select("*")
    .single();

  return {
    props: {
      role: data?.role
    }
  }
}

export default Dashboard