import { supabase } from "lib/supabase";
import absoluteUrl from "next-absolute-url";
import { useQuery } from "react-query";

const serialize = (obj: any) => {
  if (obj) {
    const str: string[] = [];
    Object.keys(obj).forEach((p) => !p && delete obj[p]);
    Object.keys(obj).forEach((p) =>
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    );
    return str.join("&");
  }

  return "";
};

export const getUser = async (req: any, id: string) => {
  const user = await supabase.auth.api.getUserByCookie(req);
  supabase.auth.setAuth(user.token as string);
  const response = await supabase
    .from("users")
    .select(
      `
      fullname,
      nip,
      unit,
      user_roles (
        role
      )
    `
    )
    .eq("id", id)
    .single();

  if (response.error) {
    throw new Error("Error fetch users");
  }

  response.data.role = response.data.user_roles[0].role;
  delete response.data.user_roles;

  return response.data;
};

const getUsers = async (query: string) => {
  const response = await fetch(`/api/users?${query}`);

  if (!response.ok) {
    throw new Error("Error fetch users");
  }

  return response.json();
};

const useUsers = (
  filter?: { query?: string; page?: number; perPage?: number } | any
) => {
  if (filter) {
    Object.keys(filter).map((k: string) => !filter[k] && delete filter[k]);
  }
  const query = serialize(filter);
  return useQuery(["users", query], () => getUsers(query), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
};

export default useUsers;
