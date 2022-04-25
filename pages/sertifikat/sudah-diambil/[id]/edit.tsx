import { Label, Input, HelperText, Select as WS } from "@roketid/windmill-react-ui";
import PageTitle from "components/Typography/PageTitle";
import Layout from "containers/Layout";
import { Field, FieldInputProps, Formik } from "formik";
import { getRoleByRequest, getSertifikatDetailByRequest } from "lib/api/utils";
import { EditSertifikatDTO } from "lib/types/Sertifikat";
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
  const initialValues = new EditSertifikatDTO()
  function onDesaChange(desa: any) {
    console.log('desa', desa)
  }

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
                  <span>Nama Lengkap</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nama_pemegang_hak || ""}
                    name="nama_pemegang_hak"
                    className="mt-1"
                    placeholder="Sherly Ayu"
                  />
                </Label>
                {errors.nama_pemegang_hak &&
                  touched.nama_pemegang_hak && (
                    <HelperText valid={false}>
                      {errors.nama_pemegang_hak}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>Nama Lengkap</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.no_seri || ""}
                    name="no.no_seri"
                    className="mt-1"
                    placeholder="Sherly Ayu"
                  />
                </Label>
                {errors.no_seri &&
                  touched.no_seri && (
                    <HelperText valid={false}>
                      {errors.no_seri}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>Nama Lengkap</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.uraian_pekerjaan || ""}
                    name="no.uraian_pekerjaan"
                    className="mt-1"
                    placeholder="Sherly Ayu"
                  />
                </Label>
                {errors.uraian_pekerjaan &&
                  touched.uraian_pekerjaan && (
                    <HelperText valid={false}>
                      {errors.uraian_pekerjaan}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>Nama Lengkap</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tanggal_di_208 || ""}
                    name="no.tanggal_di_208"
                    className="mt-1"
                    placeholder="Sherly Ayu"
                  />
                </Label>
                {errors.tanggal_di_208 &&
                  touched.tanggal_di_208 && (
                    <HelperText valid={false}>
                      {errors.tanggal_di_208}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>Nama Lengkap</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.no_di_301 || ""}
                    name="no.no_di_301"
                    className="mt-1"
                    placeholder="Sherly Ayu"
                  />
                </Label>
                {errors.no_di_301 &&
                  touched.no_di_301 && (
                    <HelperText valid={false}>
                      {errors.no_di_301}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>Nama Lengkap</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.no_berkas || ""}
                    name="no.no_berkas"
                    className="mt-1"
                    placeholder="Sherly Ayu"
                  />
                </Label>
                {errors.no_berkas &&
                  touched.no_berkas && (
                    <HelperText valid={false}>
                      {errors.no_berkas}
                    </HelperText>
                  )}

                <Label className="mt-4">
                  <span>Nama Lengkap</span>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.luas || ""}
                    name="no.luas"
                    className="mt-1"
                    placeholder="Sherly Ayu"
                  />
                </Label>
                {errors.luas &&
                  touched.luas && (
                    <HelperText valid={false}>
                      {errors.luas}
                    </HelperText>
                  )}


                <Label className="mt-4">
                  <span>Kecamatan/Desa</span>
                  <Select<any, false, GroupedOption>
                    options={groupedOptions}
                    className={WS.propTypes?.className! as unknown as string || 'asd'}
                    formatGroupLabel={formatGroupLabel}
                    onChange={(daerah) => setFieldValue('daerah', daerah.value)}
                  />
                </Label>
                {errors.nama_pemegang_hak &&
                  touched.nama_pemegang_hak && (
                    <HelperText valid={false}>
                      {errors.nama_pemegang_hak}
                    </HelperText>
                  )}

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