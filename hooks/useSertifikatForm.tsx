import {
  Button,
  HelperText,
  Input,
  Label,
  Select as WSelect,
} from "@roketid/windmill-react-ui";
import createValidator from "class-validator-formik";
import SectionTitle from "components/Typography/SectionTitle";
import { Formik } from "formik";
import {
  CreateSertifikatDTO,
  EditSertifikatBelumDiambilDTO,
  uraianPekerjaan,
} from "lib/types/Sertifikat";
import { useRouter } from "next/router";
import React, { CSSProperties } from "react";
import Select from "react-select";
import { daerah } from "utils/daerah";

const groupStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles: CSSProperties = {
  borderRadius: "2em",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

interface Option {
  label: string;
  value: {
    kecamatan: string;
    desa: string;
  };
}

interface GroupedOption {
  label: string;
  options: Option[];
}

const groupedOptions: GroupedOption[] = daerah.map((d) => {
  const options = d.desa.map((ds) => ({
    value: {
      desa: ds.nama,
      kecamatan: d.nama,
    },
    label: ds.nama,
  }));

  return {
    label: d.nama,
    options,
  };
});

const formatGroupLabel = (data: GroupedOption) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const SertifikatForm: React.FC<{
  type: "create" | "update";
  initialValues: CreateSertifikatDTO | EditSertifikatBelumDiambilDTO;
  mutation: any;
}> = ({ initialValues, mutation }) => {
  const { back } = useRouter();

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          if (!values.diambil) {
            values.diambil = false;
          }

          const errors = createValidator(CreateSertifikatDTO)(values);

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          mutation.mutate(values, {
            onError: (error: any) => {
              alert("failed update sertifikat");
            },
            onSuccess: () => {
              back();
            },
            onSettled: () => {
              setSubmitting(false);
            },
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          isSubmitting,
          handleChange,
          setFieldValue,
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
              />
            </Label>
            {errors.nama_pemegang_hak && touched.nama_pemegang_hak && (
              <HelperText valid={false}>{errors.nama_pemegang_hak}</HelperText>
            )}

            <Label className="mt-4">
              <span>No Seri</span>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.no_seri || ""}
                name="no_seri"
                className="mt-1"
              />
            </Label>
            {errors.no_seri && touched.no_seri && (
              <HelperText valid={false}>{errors.no_seri}</HelperText>
            )}

            <Label className="mt-4">
              <span>Uraian Pekerjaan</span>
              <WSelect
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.uraian_pekerjaan || ""}
                name="uraian_pekerjaan"
                className="mt-1"
              >
                {uraianPekerjaan.map((val) => (
                  <option key={val}>{val}</option>
                ))}
              </WSelect>
            </Label>
            {errors.uraian_pekerjaan && touched.uraian_pekerjaan && (
              <HelperText valid={false}>{errors.uraian_pekerjaan}</HelperText>
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
            {errors.tanggal_di_208 && touched.tanggal_di_208 && (
              <HelperText valid={false}>{errors.tanggal_di_208}</HelperText>
            )}

            <Label className="mt-4">
              <span>No DI.301</span>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.no_di_301 || ""}
                name="no_di_301"
                className="mt-1"
                type="number"
              />
            </Label>
            {errors.no_di_301 && touched.no_di_301 && (
              <HelperText valid={false}>{errors.no_di_301}</HelperText>
            )}

            <Label className="mt-4">
              <span>No Berkas</span>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.no_berkas || ""}
                name="no_berkas"
                className="mt-1"
                type="number"
              />
            </Label>
            {errors.no_berkas && touched.no_berkas && (
              <HelperText valid={false}>{errors.no_berkas}</HelperText>
            )}

            <Label className="mt-4">
              <span>Tahun Berkas</span>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tahun_berkas || ""}
                name="tahun_berkas"
                className="mt-1"
                type="number"
              />
            </Label>
            {errors.tahun_berkas && touched.tahun_berkas && (
              <HelperText valid={false}>{errors.tahun_berkas}</HelperText>
            )}

            <Label className="mt-4">
              <span>Luas</span>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.luas || ""}
                name="luas"
                className="mt-1"
                type="number"
              />
            </Label>
            {errors.luas && touched.luas && (
              <HelperText valid={false}>{errors.luas}</HelperText>
            )}

            <Label className="mt-4">
              <span>Desa/Kelurahan</span>
              <Select<any, false, GroupedOption>
                options={groupedOptions}
                formatGroupLabel={formatGroupLabel}
                defaultValue={
                  values.daerah?.desa && {
                    label: values.daerah.desa,
                    value: values.daerah,
                  }
                }
                onChange={(daerah: Option) =>
                  setFieldValue("daerah", daerah.value)
                }
              />
            </Label>
            {errors.daerah && touched.daerah && (
              <HelperText valid={false}>{errors.daerah}</HelperText>
            )}

            <Label className="mt-4">
              <span>
                Bukti Fisik
                {initialValues.bukti_fisik?.name &&
                  " :" + initialValues.bukti_fisik.name}
              </span>

              <Input
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  setFieldValue("bukti_fisik", file);
                }}
                accept=".pdf"
                onBlur={handleBlur}
                name="bukti_fisik"
                className="mt-1 border p-2"
                type="file"
              />
            </Label>
            {errors.bukti_fisik && touched.bukti_fisik && (
              <HelperText valid={false}>{errors.bukti_fisik}</HelperText>
            )}

            <div className="mt-10"></div>
            <SectionTitle>Tipe Sertifikat</SectionTitle>

            <div className="mt-4">
              {/* TODO: Check if this label is accessible, or fallback */}
              {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
              <div className="mt-2" role="group" aria-labelledby="tipe-user">
                <Label radio>
                  <Input
                    type="radio"
                    value="read-only"
                    name="diambil"
                    checked={!values.diambil}
                    onChange={() => {
                      setFieldValue("diambil", !values.diambil);
                    }}
                  />
                  <span className="ml-2">Belum Diambil</span>
                </Label>
                <Label radio>
                  <Input
                    className="ml-6"
                    type="radio"
                    value="moderator"
                    name="diambil"
                    checked={values.diambil}
                    onChange={() => {
                      setFieldValue("diambil", !values.diambil);
                    }}
                  />
                  <span className="ml-2">Sudah Diambil</span>
                </Label>
              </div>
            </div>

            <Label className="mt-4">
              <span>Nama Penerima</span>
              <Input
                disabled={!values.diambil}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.diambil ? values.nama_penerima || "" : ""}
                name="nama_penerima"
                className="mt-1"
              />
            </Label>
            {values.diambil &&
              errors.nama_penerima &&
              touched.nama_penerima && (
                <HelperText valid={false}>{errors.nama_penerima}</HelperText>
              )}

            <Label className="mt-4">
              <span>NIK Penerima</span>
              <Input
                disabled={!values.diambil}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.diambil ? values.nik_penerima || "" : ""}
                name="nik_penerima"
                className="mt-1"
                type="number"
              />
            </Label>
            {values.diambil && errors.nik_penerima && touched.nik_penerima && (
              <HelperText valid={false}>{errors.nik_penerima}</HelperText>
            )}

            <Label className="mt-4">
              <span>Tanggal Pengambilan</span>
              <Input
                disabled={!values.diambil}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.diambil ? values.tanggal_pengambilan || "" : ""}
                name="tanggal_pengambilan"
                className="mt-1"
                type="date"
              />
            </Label>
            {values.diambil &&
              errors.tanggal_pengambilan &&
              touched.tanggal_pengambilan && (
                <HelperText valid={false}>
                  {errors.tanggal_pengambilan}
                </HelperText>
              )}

            <div className="flex flex-wrap mt-9 pb-11 justify-end gap-3">
              <div className="hidden sm:block">
                <Button type="button" onClick={back} layout="outline">
                  Batal
                </Button>
              </div>
              <div className="hidden sm:block">
                <Button
                  type="submit"
                  disabled={isSubmitting || values === initialValues}
                >
                  {isSubmitting ? "Memproses..." : "Tambah"}
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
                  Batal
                </Button>
              </div>
              <div className="block w-full sm:hidden">
                <Button
                  type="submit"
                  disabled={isSubmitting || values === initialValues}
                  block
                  size="large"
                >
                  {isSubmitting ? "Memproses..." : "Tambah"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SertifikatForm;
