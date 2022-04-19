import { supabase } from 'lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return new Response(JSON.stringify({ error: { message: "unauthorized" } }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return NextResponse.next();
}