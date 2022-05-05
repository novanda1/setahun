import { supabase } from "lib/supabase";
import { Sertifikat } from "lib/types/Sertifikat";
import { useMutation, useQueryClient } from "react-query";

const deleteSertifikat = async (sertifikat: Sertifikat) => {
  const { data, error } = await supabase
    .from("sertifikat")
    .delete()
    .match({ id: sertifikat.id });

  if (data) {
    supabase.storage
      .from("bukti-fisik")
      .remove([
        `${sertifikat.daerah.kecamatan}/${sertifikat.daerah.desa}/${sertifikat.nama_pemegang_hak}-${sertifikat.no_seri}.pdf`,
      ]);
    return {
      data,
    };
  } else {
    throw error;
  }
};

export default function useDeleteSertifikat() {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, Sertifikat, unknown>(
    (input) => deleteSertifikat(input),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("sertifikat");
      },
    }
  );
}
