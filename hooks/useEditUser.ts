import { supabase } from "lib/supabase";
import { ResponseValue } from "lib/types/response";
import { UpdateUserDTO } from "lib/types/User";
import {
  useMutation,
  useQueryClient,
} from "react-query";

const editUser = async (
  user: UpdateUserDTO
): Promise<ResponseValue> => {
  const { id, role, ...input } = user;
  let response = new ResponseValue(
    "error",
    "not executed"
  );

  try {
    const roleMutation = await supabase
      .from("user_roles")
      .update({ role })
      .match({ user_id: id });

    let userMutation;
    if (!roleMutation.error) {
      userMutation = await supabase
        .from("users")
        .update(input)
        .match({ id: id });
    }

    if (
      !userMutation?.error &&
      !roleMutation.error
    ) {
      response = new ResponseValue(
        "ok",
        "Update user and role success"
      );
    }
  } catch (error) {
    response = new ResponseValue(
      "error",
      "Update user and role failed"
    );
  }

  return response;
};

export default function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    unknown,
    UpdateUserDTO,
    unknown
  >((input) => editUser(input), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        "users"
      );
    },
  });
}
