import { plainToClass } from "class-transformer";
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
  "Pendaftaran Tanah Pertama Kali untuk Wakaf",
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
  | "Pendaftaran Tanah Pertama Kali untuk Wakaf"
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

  @IsNotEmpty()
  bukti_fisik: File | FileObject | null;
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

  @IsNotEmpty()
  bukti_fisik: File | FileObject | null;
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

  @IsNotEmpty()
  bukti_fisik: File | FileObject | null;
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

  @IsNotEmpty()
  bukti_fisik: File | FileObject | null;
}

export type SertifikatArrType =
  | "text"
  | "number"
  | "daerah"
  | "date"
  | "select";

const sertifikat = plainToClass(Sertifikat, {
  // dummy: just to get type
  created_at: "2022-04-28T20:11:22.003062+00:00",
  daerah: { desa: "Sukoharjo", kecamatan: "Bandung" },
  diambil: true,
  id: "fd8e2c3f-6dbe-4ed2-9603-894c43c60a6d",
  luas: 896,
  nama_pemegang_hak: "ADIN NURUL",
  nama_penerima: "NOVANDA AHSAN",
  nik_penerima: 1112706712312312,
  no_berkas: 645465465,
  no_di_301: 65465,
  no_seri: "AB9174",
  tahun_berkas: 2015,
  tanggal_di_208: new Date(),
  tanggal_pengambilan: new Date(),
  uraian_pekerjaan: "Sertifikat Pengganti Karena Hilang",
});

export const sertifikatArr = Object.keys(sertifikat)
  .filter((s) => s !== "id")
  .filter((s) => s !== "created_at")
  .map((key) => {
    const name = key
      ?.split("_")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    let type: SertifikatArrType = "number";

    if (key === "daerah") type = "daerah";
    else if (key.includes("tanggal")) type = "date";
    else if (key === "diambil") type = "select";
    else if (typeof sertifikat[key as keyof Sertifikat] === "string")
      type = "text";

    return {
      name,
      type,
    };
  });

export interface Bucket {
  id: string;
  name: string;
  owner: string;
  created_at: string;
  updated_at: string;
  public: boolean;
}

export interface FileObject {
  name: string;
  bucket_id: string;
  owner: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: {};
  buckets: Bucket;
}
