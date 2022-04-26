import { supabase } from "lib/supabase";
import { useMutation, useQueryClient } from "react-query";

const deleteSertifikat = async (id: string) => {
  const { data, error } = await supabase
    .from("sertifikat")
    .delete()
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
  return useMutation<any, unknown, string, unknown>(
    (input) => deleteSertifikat(input),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("sertifikat");
      },
    }
  );
}
