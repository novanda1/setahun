import adminSupabase from "lib/api/supabase";
import { setAuthCookie } from "lib/cookies";
import { addUserRole, getID } from "lib/jwt";
import { supabase } from "lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { event, session } = req.body;
  if (event === "SIGNED_IN") {
    const access_token = session?.access_token;
    const { data } = await adminSupabase
      .from("user_roles")
      .select("*")
      .eq("user_id", getID(access_token))
      .single();

    const addedUserRoleJWT = addUserRole(access_token, data.role);
    req.body.session.access_token = addedUserRoleJWT;

    supabase.auth.setAuth(addedUserRoleJWT);

    setAuthCookie(req, res);

    res.status(200).json({ token: addedUserRoleJWT });
    return;
  } else supabase.auth.api.setAuthCookie(req, res);
}
