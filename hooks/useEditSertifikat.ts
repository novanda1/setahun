import { supabase } from "lib/supabase";
import { EditSertifikatDTO } from "lib/types/Sertifikat";
import { useMutation, useQueryClient } from "react-query";

const editSertifikat = async ({
  id,
  bukti_fisik,
  ...sertifikat
}: EditSertifikatDTO) => {
  const { data, error } = await supabase
    .from("sertifikat")
    .update(sertifikat)
    .match({ id });

  const file =
    bukti_fisik &&
    (await supabase.storage
      .from("bukti-fisik")
      .update(
        `${sertifikat.daerah.kecamatan}/${sertifikat.daerah.desa}/${sertifikat.nama_pemegang_hak}-${sertifikat.no_seri}.pdf`,
        bukti_fisik as File,
        {
          cacheControl: "3600",
          upsert: false,
        }
      ));

  if (data) {
    return {
      data,
      file,
    };
  } else {
    throw error;
  }
};

export default function useEditSertifikat() {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, EditSertifikatDTO, unknown>(
    (input) => editSertifikat(input),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("sertifikat");
      },
    }
  );
}
