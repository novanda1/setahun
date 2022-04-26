import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from "class-validator";

export type Daerah = { kecamatan: string; desa: string };

export const uraianPekerjaan = [
  "Ganti Nadzir",
  "Ganti Nama Pemegang Hak Tanggungan",
  "Merger Hak Tanggungan",
  "Pemecahan Bidang",
  "Pemisahan Bidang",
  "Pencatatan Perubahan Penggunaan Tanah",
  "Pendaftaran SK Hak",
  "Pendaftaran Tanah Pertama Kali Pengakuan/Penegasan Hak",
  "Pendaftaran Tanah Pertama Kali Wakaf untuk Tanah yang Belum Sertifikat",
  "Penggabungan Bidang",
  "Pengukuran dan Pemetaan Kadastral (Peta Bidang)",
  "Peralihan Hak - Hibah",
  "Peralihan Hak - Jual Beli",
  "Peralihan Hak - Lelang",
  "Peralihan Hak - Pembagian Hak Bersama",
  "Peralihan Hak - Pewarisan",
  "Roya",
  "Sertifikat Pengganti Karena Blanko Lama",
  "Sertifikat Pengganti Karena Hilang",
  "Sertifikat Pengganti Karena Rusak",
  "Wakaf dari Tanah yang Sudah Bersertifikat",
];
export type UraianPekerjaan =
  | "Ganti Nadzir"
  | "Ganti Nama Pemegang Hak Tanggungan"
  | "Merger Hak Tanggungan"
  | "Pemecahan Bidang"
  | "Pemisahan Bidang"
  | "Pencatatan Perubahan Penggunaan Tanah"
  | "Pendaftaran SK Hak"
  | "Pendaftaran Tanah Pertama Kali Pengakuan/Penegasan Hak"
  | "Pendaftaran Tanah Pertama Kali Wakaf untuk Tanah yang Belum Sertifikat"
  | "Penggabungan Bidang"
  | "Pengukuran dan Pemetaan Kadastral (Peta Bidang)"
  | "Peralihan Hak - Hibah"
  | "Peralihan Hak - Jual Beli"
  | "Peralihan Hak - Lelang"
  | "Peralihan Hak - Pembagian Hak Bersama"
  | "Peralihan Hak - Pewarisan"
  | "Roya"
  | "Sertifikat Pengganti Karena Blanko Lama"
  | "Sertifikat Pengganti Karena Hilang"
  | "Sertifikat Pengganti Karena Rusak"
  | "Wakaf dari Tanah yang Sudah Bersertifikat";

export interface ISertifikat {
  id: string;
  created_at: string;
  nama_pemegang_hak: string;
  no_seri: string;
  tanggal_di_208: string;
  no_di_301: number;
  no_berkas: number;
  tahun_berkas: number;
  luas: number;
  daerah: Daerah;
  uraian_pekerjaan: UraianPekerjaan;
  diambil: boolean;
  nama_penerima?: string;
  nik_penerima?: string;
  tanggal_pengambilan?: string;
}

export class Sertifikat {
  @IsNotEmpty()
  daerah: Daerah;

  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  created_at: string;

  @IsString()
  nama_pemegang_hak: string;

  @IsString()
  no_seri: string;

  @IsString()
  tanggal_di_208: string;

  @IsInt()
  no_di_301: number;

  @IsInt()
  no_berkas: number;

  @IsInt()
  tahun_berkas: number;

  @IsInt()
  luas: number;

  @IsString()
  uraian_pekerjaan: UraianPekerjaan;

  @IsBoolean()
  diambil: boolean;

  @IsString()
  nama_penerima: string;

  @IsInt()
  @Min(1000000000000000, { message: "NIK Salah" })
  @Max(9999999999999999, { message: "NIK Salah" })
  nik_penerima: number;

  @IsString()
  tanggal_pengambilan: string;
}

export class EditSertifikatDTO {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  daerah: Daerah;

  @IsString()
  @IsString()
  @IsNotEmpty()
  nama_pemegang_hak: string;

  @IsString()
  @IsOptional()
  uraian_pekerjaan: UraianPekerjaan;

  @IsNotEmpty()
  @IsString()
  no_seri: string;

  @IsNotEmpty()
  @IsString()
  tanggal_di_208: string;

  @IsNotEmpty()
  @IsInt()
  no_di_301: number;

  @IsNotEmpty()
  @IsInt()
  no_berkas: number;

  @IsNotEmpty()
  @IsInt()
  tahun_berkas: number;

  @IsNotEmpty()
  @IsInt()
  luas: number;

  @IsNotEmpty()
  @IsString()
  nama_penerima?: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1000000000000000, { message: "NIK Salah" })
  @Max(9999999999999999, { message: "NIK Salah" })
  nik_penerima?: number;

  @IsNotEmpty()
  @IsString()
  tanggal_pengambilan?: string;

  @IsBoolean()
  diambil: boolean;
}

export class EditSertifikatBelumDiambilDTO {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  daerah: Daerah;

  @IsString()
  @IsString()
  @IsNotEmpty()
  nama_pemegang_hak: string;

  @IsString()
  @IsOptional()
  uraian_pekerjaan: UraianPekerjaan;

  @IsNotEmpty()
  @IsString()
  no_seri: string;

  @IsNotEmpty()
  @IsString()
  tanggal_di_208: string;

  @IsNotEmpty()
  @IsInt()
  no_di_301: number;

  @IsNotEmpty()
  @IsInt()
  no_berkas: number;

  @IsNotEmpty()
  @IsInt()
  tahun_berkas: number;

  @IsNotEmpty()
  @IsInt()
  luas: number;

  @IsBoolean()
  diambil: boolean;

  @IsOptional()
  nama_penerima?: string;

  @IsOptional()
  nik_penerima?: number;

  @IsOptional()
  tanggal_pengambilan?: string;
}

export class CreateSertifikatDTO {
  @IsNotEmpty()
  daerah: Daerah;

  @IsString()
  @IsString()
  @IsNotEmpty()
  nama_pemegang_hak: string;

  @IsString()
  @IsOptional()
  uraian_pekerjaan: UraianPekerjaan;

  @IsNotEmpty()
  @IsString()
  no_seri: string;

  @IsNotEmpty()
  @IsString()
  tanggal_di_208: string;

  @IsNotEmpty()
  @IsInt()
  no_di_301: number;

  @IsNotEmpty()
  @IsInt()
  no_berkas: number;

  @IsNotEmpty()
  @IsInt()
  tahun_berkas: number;

  @IsNotEmpty()
  @IsInt()
  luas: number;

  @IsBoolean()
  diambil: boolean;

  @IsOptional()
  nama_penerima?: string;

  @IsOptional()
  nik_penerima?: number;

  @IsOptional()
  tanggal_pengambilan?: string;
}
