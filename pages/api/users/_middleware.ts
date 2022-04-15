import { supabase } from 'lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const user = await supabase.auth.api.getUserByCookie(req)

  if (user?.token) {
    supabase.auth.setAuth(user.token)
    const { status } = await supabase
      .from('user_roles')
      .select('*')

    if (status !== 200) {
      return new Response(JSON.stringify({ error: { message: "permission denied" } }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

  return NextResponse.next();
}