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
  const origin = process.env.NEXT_PUBLIC_URL as string;
  const response = await fetch(`${origin}/api/users/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error fetch users");
  }

  return response.json();
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
