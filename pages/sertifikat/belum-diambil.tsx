import SertifikatPage from "components/Sertifikat";
import { getRoleByRequest } from "lib/api/utils";
import { GetServerSideProps } from "next";
import Head from "next/head";
import PageTitle from "../../components/Typography/PageTitle";
import Layout from "../../containers/Layout";

const BelumDiambil = ({ role }: any) => {
  return (
    <Layout role={role}>
      <Head>
        <title>Sertifikat Belum Diambil - Setahun</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <PageTitle>Sertifikat Belum Diambil</PageTitle>

      <SertifikatPage />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const role = await getRoleByRequest(context);

  return {
    props: {
      role: role,
    },
  };
};

export default BelumDiambil;
