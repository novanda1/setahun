import { supabase } from "lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const user = await supabase.auth.api.getUserByCookie(req);

  if (user?.token) {
    supabase.auth.setAuth(user.token);
    const { status, data } = await supabase
      .from("user_roles")
      .select("*")
      .single();

    if (
      status !== 200 &&
      data?.role !== "moderator" &&
      data?.role !== "admin"
    ) {
      return new Response(
        JSON.stringify({ error: { message: "permission denied" } }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  return NextResponse.next();
}
