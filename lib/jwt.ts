import jwt from "jsonwebtoken";

export const addUserRole = (
  token: string,
  role: string = "read-only"
): string => {
  const secret = process.env.SUPABASE_JWT_SECRET as string;
  const claims = jwt.verify(token, secret) as any;
  claims.userRole = role;
  return jwt.sign(claims, secret);
};
