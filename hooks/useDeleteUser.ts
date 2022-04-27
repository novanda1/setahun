import { supabase } from "lib/supabase";
import { ResponseValue } from "lib/types/response";
import { DeleteUserDTO } from "lib/types/User";
import { useMutation, useQueryClient } from "react-query";

const deleteAuthUser = async (user: DeleteUserDTO) => {
  const response = await fetch(`/api/users/${user.id}`, {
    method: "DELETE",
  });

  return response.json();
};

const deleteUser = async (user: DeleteUserDTO): Promise<ResponseValue> => {
  let response = new ResponseValue("error", "not executed");

  if (supabase.auth.user()?.id === user.id) {
    response = new ResponseValue("error", "Cant delete self");
    return response;
  }

  try {
    const authUser = await deleteAuthUser(user);

    if (!authUser.error)
      response = new ResponseValue("ok", "Delete user successfully");
    else response = new ResponseValue("error", authUser.error);
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
