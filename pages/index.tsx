import "es6-shim";
import "reflect-metadata";

import { getRoleByRequest } from "lib/api/utils";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import Layout from "../containers/Layout";

function Dashboard({ role }: any) {
  const { push, query } = useRouter();
  useEffect(() => {
    if (query?.token) push("/", undefined, { shallow: true });
  }, [push, query]);

  return (
    <Layout role={role}>
      <Head>
        <title>Dashboard - Setahun</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PageTitle>Dashboard</PageTitle>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const role = await getRoleByRequest(context);

  return {
    props: {
      role: role,
    },
  };
};

export default Dashboard;
