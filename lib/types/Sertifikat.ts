export type Sertifikat = {
  id: string;
  created_at: string;
  nama_pemegang_hak: string;
  no_seri: string;
  tanggal_di_208: string;
  no_di_301: number;
  no_berkas: number;
  tahun_berkas: number;
  luas_bangunan: number;
  nama_penerima: string;
  tanggal_pengambilan: string;
  desa: string;
  kecamatan: string;
  uraian_pekerjaan: string;
  diambil: boolean;
};

class CreateSertifikatDTO {}
