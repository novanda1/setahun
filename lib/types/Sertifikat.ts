import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export type Daerah = { kecamatan: string; desa: string };

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

  @IsString()
  nik_penerima: string;

  @IsString()
  tanggal_pengambilan: string;
}

export class EditSertifikatDTO {
  @IsNotEmpty()
  daerah: Daerah;

  @IsString()
  @IsString()
  nama_pemegang_hak: string;

  @IsString()
  @IsOptional()
  uraian_pekerjaan: UraianPekerjaan;

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
  @IsOptional()
  nama_penerima?: string;

  @IsString()
  @IsOptional()
  nik_penerima?: string;

  @IsString()
  @IsOptional()
  tanggal_pengambilan?: string;

  @IsBoolean()
  diambil: boolean;
}
