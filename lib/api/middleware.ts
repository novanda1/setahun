import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "./supabase"

export const loggedInMiddleware = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase.auth.api.getUserByCookie(req, res)
  if (!data && error) {
    res.status(401).json({ error: { message: "not authenticated" } })
    return
  }
}

export const adminMiddleware = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await supabase.auth.api.getUserByCookie(req, res)
  const { status } = await supabase.from('user_roles').select('*').eq('user_id', user.data?.id).single()

  if (status !== 200) {
    res.status(200).json({ error: { message: "permission denied" } })
    return
  }
}
