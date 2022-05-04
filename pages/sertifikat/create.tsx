import PageTitle from "components/Typography/PageTitle";
import Layout from "containers/Layout";
import useCreateSertifikat from "hooks/useCreateSertifikat";
import SertifikatForm from "hooks/useSertifikatForm";
import { getRoleByRequest } from "lib/api/utils";
import { CreateSertifikatDTO } from "lib/types/Sertifikat";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

const CreateSertifikat: React.FC<any> = ({ role }: { role: string }) => {
  const initialValues = new CreateSertifikatDTO();
  const createSertifikat = useCreateSertifikat();

  return (
    <>
      <Layout role={role}>
        <Head>
          <title>Tambah Sertifikat - Setahun</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <div className="w-full mx-auto">
          <PageTitle>Tambah Sertifikat</PageTitle>

          <SertifikatForm
            type="create"
            initialValues={initialValues}
            mutation={createSertifikat}
          />
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const role = await getRoleByRequest(context);

  return {
    props: {
      role,
    },
  };
};

export default CreateSertifikat;
