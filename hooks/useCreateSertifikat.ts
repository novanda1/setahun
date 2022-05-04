import { supabase } from "lib/supabase";
import { CreateSertifikatDTO } from "lib/types/Sertifikat";
import { useMutation, useQueryClient } from "react-query";

const createSertifikat = async ({
  bukti_fisik,
  ...sertifikat
}: CreateSertifikatDTO) => {
  const { data, error } = await supabase.from("sertifikat").insert(sertifikat);

  const uploadedFile = await supabase.storage
    .from("bukti-fisik")
    .upload(
      `${sertifikat.daerah.kecamatan}/${sertifikat.daerah.desa}/${sertifikat.nama_pemegang_hak}-${sertifikat.no_seri}.pdf`,
      bukti_fisik,
      {
        cacheControl: "3600",
        upsert: false,
      }
    );

  if (data) {
    return {
      data,
      uploadedFile,
    };
  } else {
    throw error;
  }
};

export default function useCreateSertifikat() {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, CreateSertifikatDTO, unknown>(
    (input) => createSertifikat(input),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("sertifikat");
      },
    }
  );
}
