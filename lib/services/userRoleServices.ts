import { supabase } from "lib/supabase";
import { UpdateUserDTO } from "lib/types/User";

export const changeUserRole = async (token: string, input: UpdateUserDTO) => {
  const { id, role, ...user } = input;
  supabase.auth.setAuth(token);
  const response = await supabase
    .from("user_roles")
    .update({ role })
    .match({ user_id: id });

  console.log("response", response);

  if (response.error) throw response.error;
  return response;
};