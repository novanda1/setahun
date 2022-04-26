import { supabase } from "lib/supabase";
import { CreateSertifikatDTO } from "lib/types/Sertifikat";
import { useMutation, useQueryClient } from "react-query";

const createSertifikat = async ({ ...sertifikat }: CreateSertifikatDTO) => {
  const { data, error } = await supabase.from("sertifikat").insert(sertifikat);

  if (data) {
    return {
      data,
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
