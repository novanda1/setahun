import { getUserRole } from "lib/jwt";
import { supabase } from "lib/supabase";
import sudoSupabase from "lib/api/supabase";
import { ResponseValue } from "lib/types/response";
import { DeleteUserDTO } from "lib/types/User";
import {
  useMutation,
  useQueryClient,
} from "react-query";

const deleteUser = async (
  user: DeleteUserDTO
): Promise<ResponseValue> => {
  let response = new ResponseValue(
    "error",
    "not executed"
  );

  const session = supabase.auth.session();
  let role = "";
  if (session?.access_token)
    role = getUserRole(session.access_token);

  if (role !== "admin") {
    response = new ResponseValue(
      "error",
      "Permission denied"
    );
    return response;
  }

  if (supabase.auth.user()?.id === user.id) {
    response = new ResponseValue(
      "error",
      "Cant delete self"
    );
    return response;
  }

  try {
    const authUser =
      await sudoSupabase.auth.api.deleteUser(
        user.id
      );

    if (!authUser.error) {
      await supabase
        .from("user_roles")
        .delete()
        .match({ user_id: user.id });

      await supabase
        .from("users")
        .delete()
        .match({ id: user.id });

      response = new ResponseValue(
        "ok",
        "Delete user successfully"
      );
    }
  } catch (error) {
    response = new ResponseValue(
      "error",
      "Delete user failed"
    );
  }

  return response;
};

export default function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    unknown,
    DeleteUserDTO,
    unknown
  >((input) => deleteUser(input), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        "users"
      );
    },
  });
}
