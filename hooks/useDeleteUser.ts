import { supabase } from "lib/supabase";
import { ResponseValue } from "lib/types/response";
import { DeleteUserDTO } from "lib/types/User";
import { useMutation, useQueryClient } from "react-query";

const deleteUser = async (user: DeleteUserDTO): Promise<ResponseValue> => {
  let response = new ResponseValue("error", "not executed");

  if (supabase.auth.user()?.id === user.id) {
    response = new ResponseValue("error", "Cant delete self");
    return response;
  }

  try {
    const authUser = await supabase
      .from("users")
      .delete()
      .match({ id: user.id });

    if (!authUser.error)
      response = new ResponseValue("ok", "Delete user successfully");
    else response = new ResponseValue("error", JSON.stringify(authUser.error));
  } catch (error) {
    response = new ResponseValue("error", "Delete user failed");
  }

  return response;
};

export default function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, DeleteUserDTO, unknown>(
    (input) => deleteUser(input),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries("users");
      },
    }
  );
}
