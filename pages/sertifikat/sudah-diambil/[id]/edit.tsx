import PageTitle from "components/Typography/PageTitle";
import Layout from "containers/Layout";
import { getRoleByRequest, getSertifikatDetailByRequest } from "lib/api/utils";
import { GetServerSideProps } from "next";
import Head from "next/head";

const SudahDiambilEdit = ({ role, sertifikat }: { role: string, sertifikat: any }) => {
  return (
    <>
      <Layout role={role}>
        <Head>Ubah {sertifikat.nama_pemegang_hak}</Head>
        <PageTitle>{sertifikat.nama_pemegang_hak}</PageTitle>
        {JSON.stringify(sertifikat)}
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sertifikat = await getSertifikatDetailByRequest(context) || null
  const role = await getRoleByRequest(context)

  return {
    props: {
      role,
      sertifikat
    },
  };
};

export default SudahDiambilEdit