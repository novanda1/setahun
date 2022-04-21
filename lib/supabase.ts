import { createClient } from "@supabase/supabase-js";

const protocol =
  process.env.NODE_ENV === "development"
    ? "http://"
    : "https://";

export const supabase = createClient(
  (protocol +
    process.env.NEXT_PUBLIC_VERCEL_URL +
    "/server") as string,
  process.env
    .NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);
