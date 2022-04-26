import { supabase } from "lib/supabase";
import { UpdateUserDTO } from "lib/types/User";

export const updateUser = async (
  token: string,
  input: UpdateUserDTO
): Promise<any> => {
  const { id, ...user } = input;
  delete user.role;
  supabase.auth.setAuth(token);
  const response = await supabase
    .from("users")
    .update({ ...user })
    .match({ id: id });

  if (response.error) throw response.error;
  return response;
};
