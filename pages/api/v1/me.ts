import { supabase } from 'lib/supabase'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, error, token, user } = await supabase.auth.api.getUserByCookie(req, res)
  let role = undefined

  if (data && token) {
    supabase.auth.setAuth(token)
    role = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', user?.id)
      .single()
  }

  res.status(200).json({ user, role, error })
}
