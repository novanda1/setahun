import { ApiError, createClient, User } from '@supabase/supabase-js'
import { CreateUserDTO } from 'lib/types/User'
import { NextApiRequest, NextApiResponse } from 'next'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_ROLE_KEY as string)
type Data = {
  data: User | null
  error: ApiError | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const input: CreateUserDTO = {
    email: 'mantabmusica@gmail.com',
    password: 'password',
    user_metadata: {
      fullname: 'Mantab Musica',
      nip: 1001,
      unit: 'Karyawan'
    }
  }
  const { data, error } = await supabase.auth.api.createUser({
    ...input,
    email_confirm: true
  })
  res.status(200).json({ data, error })
}
