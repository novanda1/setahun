import supabase from "lib/api/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const user = await supabase.auth.api.getUserByCookie(req);

  if (user?.token) {
    supabase.auth.setAuth(user.token);
    const { status, data } = await supabase
      .from("user_roles")
      .select("*")
      .eq("user_id", user.user?.id)
      .single();

    if (status !== 200 && data?.role !== "admin") {
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
