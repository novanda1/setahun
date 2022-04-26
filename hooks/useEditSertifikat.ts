import { supabase } from "lib/supabase";
import { EditSertifikatDTO } from "lib/types/Sertifikat";
import { useMutation, useQueryClient } from "react-query";

const editSertifikat = async ({ id, ...sertifikat }: EditSertifikatDTO) => {
  const { data, error } = await supabase
    .from("sertifikat")
    .update(sertifikat)
    .match({ id });

  if (data) {
    return {
      data,
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
