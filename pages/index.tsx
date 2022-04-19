import 'reflect-metadata'
import 'es6-shim'
import Cookies from 'cookies'

import React, { useEffect } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import Layout from '../containers/Layout'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getUserRole } from 'lib/jwt'
import { supabase } from 'lib/supabase'
import { useRouter } from 'next/router'


function Dashboard({ role }: any) {
  const { push, query } = useRouter()
  useEffect(() => {
    if (query?.token)
      push('/', undefined, { shallow: true })
  }, [push, query])

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

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const cookies = new Cookies(req, res)
  let role = ''

  const initial = await supabase.auth.api.getUserByCookie(req, res)

  const token = cookies.get('sb-access-token') || initial?.token || query.token as string || ''
  if (token)
    role = getUserRole(token) || 'fall'


  return {
    props: {
      role: role
    }
  }
}

export default Dashboard