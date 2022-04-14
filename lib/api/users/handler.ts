import { plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { CreateUserDTO, UpdateUserDTO } from "lib/types/User"
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

  if (data) {
    res.status(200).json({ data, count, page: +page, header: req.headers })
    return
  }
  else {
    res.status(404).json({ error: { message: "failed to get users" } })
    return
  }
}

export const updateUserHandler = async (req: NextApiRequest, res: NextApiResponse<any>, id: string) => {
  const input: UpdateUserDTO = plainToClass(UpdateUserDTO, req.body)

  const errors = await validate(input).then(errors => {
    if (errors.length > 0) {
      return errors
    } else {
      return
    }
  });

  if (errors && errors?.length > 0) {
    res.status(404).json({ errors })
    return
  }

  const { data, error } = await supabase
    .from('users')
    .update(input)
    .eq('user_id', id)
    .single()

  if (data && !error) {
    res.status(201).json(data)
    return
  } else {
    res.status(404).json(error)
  }
}


export const deleteUserHandler = async (req: NextApiRequest, res: NextApiResponse<any>, id: string) => {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('user_id', id)

  if (data && !error) {
    res.status(201).json(data)
    return
  } else {
    res.status(404).json(error)
  }
}