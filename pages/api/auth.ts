import { addUserRole, getID } from "lib/jwt";
import { supabase } from "lib/supabase";
import adminSupabase from "lib/api/supabase";
import {
  NextApiRequest,
  NextApiResponse,
} from "next";
import {
  COOKIE_OPTIONS,
  setCookies,
} from "lib/cookies";

function setAuthCookie(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
  const { event, session } = req.body;

  if (!event)
    throw new Error("Auth event missing!");
  if (event === "SIGNED_IN") {
    if (!session)
      throw new Error("Auth session missing!");
    setCookies(
      req,
      res,
      [
        {
          key: "access-token",
          value: session.access_token,
        },
        {
          key: "refresh-token",
          value: session.refresh_token,
        },
      ].map((token) => ({
        name: `${COOKIE_OPTIONS.name}-${token.key}`,
        value: token.value,
        domain: COOKIE_OPTIONS.domain,
        maxAge: COOKIE_OPTIONS.lifetime ?? 0,
        path: COOKIE_OPTIONS.path,
        sameSite: COOKIE_OPTIONS.sameSite,
      }))
    );
  }
  if (event === "SIGNED_OUT") {
    setCookies(
      req,
      res,
      ["access-token", "refresh-token"].map(
        (key) => ({
          name: `${COOKIE_OPTIONS.name}-${key}`,
          value: "",
          maxAge: -1,
        })
      )
    );
  }
}

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

    const addedUserRoleJWT = addUserRole(
      access_token,
      data.role
    );
    req.body.session.access_token =
      addedUserRoleJWT;

    supabase.auth.setAuth(addedUserRoleJWT);

    setAuthCookie(req, res);

    res
      .status(200)
      .json({ token: addedUserRoleJWT });
    return;
  } else
    supabase.auth.api.setAuthCookie(req, res);
}
