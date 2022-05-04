import "es6-shim";
import { getRoleByRequest } from "lib/api/utils";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import "reflect-metadata";
import { serialize } from "utils/serialize";
import PageTitle from "../components/Typography/PageTitle";
import Layout from "../containers/Layout";

function Dashboard({ role }: any) {
  const { asPath, push, query } = useRouter();
  const urlSearchParams = new URLSearchParams(
    asPath.replace("#", "").replace("/", "")
  );
  const params = Object.fromEntries(urlSearchParams.entries());
  const serializedParams = serialize(params);

  useEffect(() => {
    if (params?.refresh_token && query === {}) push(`?${serializedParams}`);
  }, [params]);

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
      role,
    },
  };
};

export default Dashboard;
