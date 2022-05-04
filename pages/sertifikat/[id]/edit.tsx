import { plainToClass } from "class-transformer";
import PageTitle from "components/Typography/PageTitle";
import Layout from "containers/Layout";
import useEditSertifikat from "hooks/useEditSertifikat";
import SertifikatForm from "hooks/useSertifikatForm";
import supabase from "lib/api/supabase";
import { getRoleByRequest, getSertifikatDetailByRequest } from "lib/api/utils";
import { EditSertifikatDTO, FileObject } from "lib/types/Sertifikat";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

const EditSertifikat: React.FC<any> = ({
  role,
  sertifikat,
  buktiFisik,
}: {
  role: string;
  sertifikat: any;
  buktiFisik?: FileObject;
}) => {
  const initialValues = plainToClass(EditSertifikatDTO, sertifikat);
  initialValues.bukti_fisik = buktiFisik || null;
  const editSertifikat = useEditSertifikat();

  return (
    <>
      <Layout role={role}>
        <Head>
          <title>
            Edit Sertifikat {sertifikat.nama_pemegang_hak} - Setahun
          </title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <div className="w-full mx-auto">
          <PageTitle>Edit Sertifikat</PageTitle>

          <SertifikatForm
            initialValues={initialValues}
            mutation={editSertifikat}
            type="update"
          />
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sertifikat = (await getSertifikatDetailByRequest(context)) || null;
  const role = await getRoleByRequest(context);

  const path = `${sertifikat.daerah.kecamatan}/${sertifikat.daerah.desa}`;
  const filename = `${sertifikat.nama_pemegang_hak}-${sertifikat.no_seri}`;
  const { data } = await supabase.storage.from("bukti-fisik").list(path, {
    limit: 100,
    search: filename,
  });

  return {
    props: {
      role,
      sertifikat,
      buktiFisik: data && data[0],
    },
  };
};

export default EditSertifikat;
