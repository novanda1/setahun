import { ApiError, createClient, User } from '@supabase/supabase-js'
import { CreateUserDTO } from 'lib/types/User'
import { NextApiRequest, NextApiResponse } from 'next'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_ROLE_KEY as string)
type Data = {
  data: User | null
  error: ApiError | null,
  token: any,
  user: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data, error, token, user } = await supabase.auth.api.getUserByCookie(req, res)
  res.status(200).json({ data, error, token, user })
}
