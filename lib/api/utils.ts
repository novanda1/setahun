import Cookies from "cookies";
import { getUser } from "hooks/useUsers";
import { getUserRole, updateToken } from "lib/jwt";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import supabase from "./supabase";

export const isNipRegistered = async (nip: number) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("nip", nip)
    .single();
  if (data && !error) return true;
  else return false;
};

export const getRoleByRequest = async ({
  req,
  res,
  query,
}: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>): Promise<string> => {
  const cookies = new Cookies(req as any, res as any);
  let role = "";

  const token = cookies.get("sb-access-token") || (query.token as string) || "";
  if (token)
    try {
      role = getUserRole(token);
    } catch {
      const newToken = await updateToken(req, res);
      role = getUserRole(newToken) || "";
    }

  return role;
};

export const getUserByRequest = async ({
  req,
  query,
}: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>): Promise<any> => {
  let user;
  try {
    const data = await getUser(req, query.id as string);
    user = data;
  } catch (error) {
    console.log("error:", error);
  }

  return user;
};
