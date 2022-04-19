import jwt from "jsonwebtoken";
import { setAuthCookie } from "./cookies";
import { supabase } from "./supabase";

export const updateToken = async (
  req: any,
  res: any
): Promise<string> => {
  const user = await supabase.auth.session();
  let token: string = "";
  if (user?.refresh_token)
    await supabase.auth
      .setSession(user?.refresh_token)
      .then((r) => {
        token = r.session?.access_token as string;
      });

  await setAuthCookie(req, res);
  return token;
};

export const addUserRole = (
  token: string,
  role: string
): string => {
  const secret = process.env
    .SUPABASE_JWT_SECRET as string;
  const claims = jwt.verify(token, secret) as any;
  try {
    claims.userRole = role;
    return jwt.sign(claims, secret);
  } catch (err) {
    console.log("err", err);
    return "fall";
  }
};

export const getUserRole = (
  token: string
): string => {
  const secret = process.env
    .SUPABASE_JWT_SECRET as string;
  try {
    const claims = jwt.verify(
      token,
      secret
    ) as any;
    return claims?.userRole;
  } catch (err) {
    console.log("err", err);
    return "";
  }
};

export const getID = (
  token?: string | null
): string => {
  if (!token) return "";
  const secret = process.env
    .SUPABASE_JWT_SECRET as string;

  try {
    const claims = jwt.verify(
      token,
      secret
    ) as any;
    return claims?.sub;
  } catch (err) {
    console.log("err", err);
    return "";
  }
};
