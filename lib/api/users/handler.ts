import { CreateUserDTO } from "lib/types/User"
import { NextApiRequest, NextApiResponse } from "next"
import { getPagination } from "utils/getPagination"
import { supabase } from "../supabase"

export const createUserHandler = async (req: NextApiRequest, res: NextApiResponse<any>, input: CreateUserDTO) => {
  const { data, error, user } = await supabase.auth.api.createUser({
    ...input,
    email_confirm: true
  })

  if (data) {
    res.status(201).json({ data, user })
    return
  } else {
    res.status(400).json(error)
    return
  }
}

export const getUsersHandler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { query } = req;
  const page: number = +query?.page || 0;
  const { from, to } = getPagination(page, 10);
  const { data, count } = await supabase
    .from("users")
    .select("*", { count: "exact" })
    .order("id", { ascending: true })
    .range(from, to);

  res.status(200).json({ data, count, page: +page, header: req.headers })
  return
}