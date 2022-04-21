import { supabase } from "lib/supabase";
import { UpdateUserDTO } from "lib/types/User";

export const updateUser = async (token: string, input: UpdateUserDTO) => {
  const { id, role, ...user } = input;
  supabase.auth.setAuth(token);
  const response = await supabase
    .from("users")
    .update({ ...user })
    .match({ id: id });

  if (response.error) throw response.error;
  return response;
};
