import jwt from "jsonwebtoken";

export const addUserRole = (token: string, role: string): string => {
  const secret = process.env.SUPABASE_JWT_SECRET as string;
  const claims = jwt.verify(token, secret) as any;
  claims.userRole = role;
  return jwt.sign(claims, secret);
};

export const getUserRole = (token?: string | null): string => {
  if (!token) return "";
  const secret = process.env.SUPABASE_JWT_SECRET as string;
  const claims = jwt.verify(token, secret) as any;
  return claims?.userRole;
};

export const getID = (token?: string | null): string => {
  if (!token) return "";
  const secret = process.env.SUPABASE_JWT_SECRET as string;
  const claims = jwt.verify(token, secret) as any;
  return claims?.sub;
};
