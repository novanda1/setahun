import { Button, HelperText, Input, Label } from "@roketid/windmill-react-ui";
import { plainToClass } from "class-transformer";
import PageTitle from "components/Typography/PageTitle";
import Layout from "containers/Layout";
import { Formik } from "formik";
import { getRoleByRequest, getSertifikatDetailByRequest } from "lib/api/utils";
import { EditSertifikatDTO, Sertifikat } from "lib/types/Sertifikat";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { CSSProperties } from "react";
import Select from "react-select";
import { daerah } from "utils/daerah";

const groupStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles: CSSProperties = {
  borderRadius: '2em',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

interface Option {
  label: string,
  value: {
    kecamatan: string,
    desa: string
  }
}

interface GroupedOption {
  label: string;
  options: Option[]
}

const groupedOptions: GroupedOption[] = daerah.map(d => {
  const options = d.desa.map(ds => ({
    value: {
      desa: ds.nama,
      kecamatan: d.nama
    },
    label: ds.nama
  }))

  return {
    label: d.nama,
    options
  }
})

const formatGroupLabel = (data: GroupedOption) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const SudahDiambilEdit: React.FC<any> = ({ role, sertifikat }: { role: string, sertifikat: any }) => {
  const initialValues = plainToClass(EditSertifikatDTO, sertifikat)

  return (
    <>
      <Layout role={role}>
        <Head>
          <title>Edit Sertifikat {sertifikat.nama_pemegang_hak} - Setahun</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <div className="w-full mx-auto">
          <PageTitle>Edit Sertifikat</PageTitle>

          <Formik initialValues={initialValues}
            onSubmit={() => { }}>

            {({
              values,
              errors,
              touched,
              handleBlur,
              handleSubmit,
              isSubmitting,
              handleChange,
              setFieldValue
            }) => (

              <form onSubmit={handleSubmit} className="pb-7">
                <Label className="mt-4">
                  <span>Nama Pemegang Hak</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nama_pemegang_hak || ""}
                    name="nama_pemegang_hak"
                    className="mt-1"
                    placeholder="ADIN NURUL UMMAH"
                  />
                </Label>
                {errors.nama_pemegang_hak &&
                  touched.nama_pemegang_hak && (
                    <HelperText valid={false}>
                      {errors.nama_pemegang_hak}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>No Seri</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.no_seri || ""}
                    name="no_seri"
                    className="mt-1"
                    placeholder="ABB619411"
                  />
                </Label>
                {errors.no_seri &&
                  touched.no_seri && (
                    <HelperText valid={false}>
                      {errors.no_seri}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>Uraian Pekerjaan</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.uraian_pekerjaan || ""}
                    name="uraian_pekerjaan"
                    className="mt-1"
                    placeholder="Ganti Nadzir"
                  />
                </Label>
                {errors.uraian_pekerjaan &&
                  touched.uraian_pekerjaan && (
                    <HelperText valid={false}>
                      {errors.uraian_pekerjaan}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>Tanggal DI.208</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tanggal_di_208 || ""}
                    name="tanggal_di_208"
                    className="mt-1"
                    type="date"
                  />
                </Label>
                {errors.tanggal_di_208 &&
                  touched.tanggal_di_208 && (
                    <HelperText valid={false}>
                      {errors.tanggal_di_208}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>No DI.301</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.no_di_301 || ""}
                    name="no_di_301"
                    className="mt-1"
                    placeholder="18461"
                  />
                </Label>
                {errors.no_di_301 &&
                  touched.no_di_301 && (
                    <HelperText valid={false}>
                      {errors.no_di_301}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>No Berkas</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.no_berkas || ""}
                    name="no_berkas"
                    className="mt-1"
                    placeholder="74047"
                  />
                </Label>
                {errors.no_berkas &&
                  touched.no_berkas && (
                    <HelperText valid={false}>
                      {errors.no_berkas}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>Luas</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.luas || ""}
                    name="luas"
                    className="mt-1"
                    placeholder="943"
                  />
                </Label>
                {errors.luas &&
                  touched.luas && (
                    <HelperText valid={false}>
                      {errors.luas}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>Desa</span>
                  <Select<any, false, GroupedOption>
                    options={groupedOptions}
                    placeholder="Pilih atau ketik untuk mencari"
                    formatGroupLabel={formatGroupLabel}
                    defaultValue={{ label: values.daerah.desa, value: values.daerah }}
                    onChange={(daerah) => setFieldValue('daerah', daerah.value)}
                  />
                </Label>
                {errors.nama_pemegang_hak &&
                  touched.nama_pemegang_hak && (
                    <HelperText valid={false}>
                      {errors.nama_pemegang_hak}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>Nama Penerima</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nama_penerima || ""}
                    name="nama_penerima"
                    className="mt-1"
                    placeholder="ADIN NURUL UMMAH"
                  />
                </Label>
                {errors.nama_penerima &&
                  touched.nama_penerima && (
                    <HelperText valid={false}>
                      {errors.nama_penerima}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>NIK Penerima</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nik_penerima || ""}
                    name="nik_penerima"
                    className="mt-1"
                    placeholder="350500000000000"
                  />
                </Label>
                {errors.nik_penerima &&
                  touched.nik_penerima && (
                    <HelperText valid={false}>
                      {errors.nik_penerima}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>Tanggal Pengambilan</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tanggal_pengambilan || ""}
                    name="tanggal_pengambilan"
                    className="mt-1"
                    type="date"
                  />
                </Label>
                {errors.tanggal_pengambilan &&
                  touched.tanggal_pengambilan && (
                    <HelperText valid={false}>
                      {errors.tanggal_pengambilan}
                    </HelperText>
                  )}

                <div className="flex flex-wrap mt-9 pb-11 justify-end gap-3">
                  <div className="hidden sm:block">
                    <Button layout="outline" >
                      Batal
                    </Button>
                  </div>
                  <div className="hidden sm:block">
                    <Button className='bg-red-600 border border-transparent active:bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300'>Simpan</Button>
                  </div>
                  <div className="block w-full sm:hidden">
                    <Button block size="large" layout="outline">
                      Batal
                    </Button>
                  </div>
                  <div className="block w-full sm:hidden">
                    <Button className='bg-red-600 border border-transparent active:bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300' block size="large">
                      Simpan
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
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