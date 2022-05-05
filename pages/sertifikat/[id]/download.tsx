import { Button } from "@roketid/windmill-react-ui";
import PageTitle from "components/Typography/PageTitle";
import Layout from "containers/Layout";
import { getRoleByRequest, getSertifikatDetailByRequest } from "lib/api/utils";
import { supabase } from "lib/supabase";
import { FileObject, Sertifikat } from "lib/types/Sertifikat";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const SertifikatDownload: React.FC<any> = ({
  role,
  sertifikat,
  buktiFisik,
}: {
  role: string;
  sertifikat: Sertifikat;
  buktiFisik: FileObject;
}) => {
  const { back } = useRouter();

  return (
    <>
      <Layout nav={false} sidebar={false} role={role}>
        <Head>
          <title>
            Download Bukti Fisik {sertifikat.nama_pemegang_hak} - Setahun
          </title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <PageTitle>{buktiFisik?.name}</PageTitle>

        <div className="flex flex-wrap mt-9 pb-11 justify-end gap-3">
          <div className="hidden sm:block">
            <Button type="button" onClick={back} layout="outline">
              Kembali
            </Button>
          </div>

          <div className="block w-full sm:hidden">
            <Button
              type="button"
              onClick={back}
              block
              size="large"
              layout="outline"
            >
              Kembali
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sertifikat = (await getSertifikatDetailByRequest(context)) || null;
  const role = await getRoleByRequest(context);

  const user = await supabase.auth.api.getUserByCookie(
    context.req,
    context.res
  );

  if (user?.token) supabase.auth.setAuth(user.token);

  let data;

  if (sertifikat?.daerah?.desa) {
    const path = `${sertifikat.daerah.kecamatan}/${sertifikat.daerah.desa}`;
    const filename = `${sertifikat.nama_pemegang_hak}-${sertifikat.no_seri}`;
    const file = await supabase.storage.from("bukti-fisik").list(path, {
      limit: 100,
      search: filename,
    });

    data = file.data;
  }
  return {
    props: {
      role,
      sertifikat,
      buktiFisik: (data && data[0]) || null,
    },
  };
};

export default SertifikatDownload;
