import { createClient } from "@supabase/supabase-js";

const protocol =
  process.env.NODE_ENV === "development" ? "http://" : "https://";

const supabase = createClient(
  (protocol + process.env.NEXT_PUBLIC_VERCEL_URL + "/server") as string,
  process.env.SUPABASE_ROLE_KEY as string
);
export default supabase;
