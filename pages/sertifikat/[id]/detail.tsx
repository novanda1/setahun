import {
  TableBody,
  TableRow,
  TableCell,
  Button,
  Table,
  TableHeader,
} from "@roketid/windmill-react-ui";
import PageTitle from "components/Typography/PageTitle";
import Layout from "containers/Layout";
import { getRoleByRequest, getSertifikatDetailByRequest } from "lib/api/utils";
import { Sertifikat } from "lib/types/Sertifikat";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const SertifikatDetail: React.FC<any> = ({
  role,
  sertifikat,
}: {
  role: string;
  sertifikat: Sertifikat;
}) => {
  const { push, back } = useRouter();

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

        <PageTitle>Detail Sertifikat</PageTitle>
        <Table>
          <TableBody>
            {Object.keys(sertifikat).map((key) => {
              if (key === "created_at" || key === "diambil" || key === "id")
                return "";
              else if (
                (!sertifikat.diambil && key === "tanggal_pengambilan") ||
                key === "nama_penerima" ||
                key === "nik_penerima"
              )
                return "";
              else if (key === "daerah")
                return (
                  <TableRow key={key}>
                    <TableCell>
                      Kecamatan/Desa
                      {/* <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{sertifikat.nama_pemegang_hak}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{sertifikat.uraian_pekerjaan}</p>
                    </div>
                  </div> */}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {sertifikat["daerah"]["kecamatan"] +
                          "/" +
                          sertifikat["daerah"]["desa"]}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              else
                return (
                  <TableRow key={key}>
                    <TableCell>
                      {key
                        .toString()
                        ?.split("_")
                        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ")}
                      {/* <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{sertifikat.nama_pemegang_hak}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{sertifikat.uraian_pekerjaan}</p>
                    </div>
                  </div> */}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {sertifikat[key as keyof Sertifikat]}
                      </span>
                    </TableCell>
                  </TableRow>
                );
            })}
          </TableBody>
        </Table>

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

  return {
    props: {
      role,
      sertifikat,
    },
  };
};

export default SertifikatDetail;
