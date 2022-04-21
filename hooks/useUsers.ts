import { supabase } from "lib/supabase";
import absoluteUrl from "next-absolute-url";
import { useQuery } from "react-query";
import { getPagination } from "utils/getPagination";

type FilterType = {
  query?: string;
  page: number;
  perPage: number;
};

const serialize = (obj: any) => {
  if (obj) {
    const str: string[] = [];
    Object.keys(obj).forEach(
      (p) => !p && delete obj[p]
    );
    Object.keys(obj).forEach((p) =>
      str.push(
        encodeURIComponent(p) +
          "=" +
          encodeURIComponent(obj[p])
      )
    );
    return str.join("&");
  }

  return "";
};

export const getUser = async (
  req: any,
  id: string
) => {
  const user =
    await supabase.auth.api.getUserByCookie(req);
  supabase.auth.setAuth(user.token as string);
  const response = await supabase
    .from("users")
    .select(
      `
      id,
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

  response.data.role =
    response.data.user_roles[0].role;
  delete response.data.user_roles;

  return response.data;
};

const getUsers = async ({
  page,
  perPage,
  query,
}: FilterType) => {
  const { from, to } = getPagination(
    page - 1,
    perPage
  );
  const { data, count } = await supabase
    .from("users")
    .select(
      `
      id,
      fullname,
      nip,
      unit,
      user_roles(
        role
      )
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (data) {
    return {
      data,
      count,
      page: +page,
    };
  } else {
    return;
  }
};

const useUsers = (filter: FilterType) => {
  if (filter) {
    Object.keys(filter).map(
      (k: string) =>
        !filter[k as keyof FilterType] &&
        delete filter[k as keyof FilterType]
    );
  }
  return useQuery(
    ["users", filter],
    () => getUsers(filter),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    }
  );
};

export default useUsers;
