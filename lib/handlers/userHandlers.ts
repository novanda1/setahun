import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import supabase from "lib/api/supabase";
import { CreateUserDTO, UpdateUserDTO } from "lib/types/User";
import { NextApiRequest, NextApiResponse } from "next";
import { getPagination } from "utils/getPagination";

export const createUserHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
  { passwordConfirm, ...input }: CreateUserDTO
) => {
  const { data, error, user } = await supabase.auth.api.createUser({
    ...input,
    email_confirm: true,
  });

  if (data && !error) {
    res.status(201).json({ data, user });
    return;
  } else {
    res.status(400).json(error);
    return;
  }
};

export const getUsersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { query } = req;
  const page: number = +query?.page - 1 || 0;
  const perPage: number = +query?.perPage;

  const { from, to } = getPagination(page, perPage);
  const { data, count } = await supabase
    .from("users")
    .select(
      `
      id,
      fullname,
      nip,
      unit,
      user_roles(
        role
      )
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (data) {
    res.json({ data, count, page: +page, header: req.headers });
    res.status(200).end();
    return;
  } else {
    res.json({ error: { message: "failed to get users" } });
    res.status(404).end();
    return;
  }
};

export const updateUserHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) => {
  const input: UpdateUserDTO = plainToClass(UpdateUserDTO, req.body);

  const errors = await validate(input).then((errors) => {
    if (errors.length > 0) {
      return errors;
    } else {
      return;
    }
  });

  if (errors && errors?.length > 0) {
    res.status(404).json({ errors });
    return;
  }

  const { data, error } = await supabase
    .from("users")
    .update(input)
    .eq("user_id", id)
    .single();

  if (data && !error) {
    res.status(201).json(data);
    return;
  } else {
    res.status(404).json(error);
  }
};

export const deleteUserHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("user_id", id);

  if (data && !error) {
    res.status(201).json(data);
    return;
  } else {
    res.status(404).json(error);
  }
};

export const getUserByIdHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { query } = req;
  const id: string = query?.id as string;

  const { data, error } = await supabase
    .from("users")
    .select(
      `
      id,
      fullname,
      nip,
      unit,
      user_roles(
        role
      )
    `,
      { count: "exact" }
    )
    .eq("id", id)
    .single();

  if (data && !error) {
    const role = data.user_roles[0].role;
    data.role = role;
    delete data.user_roles;
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "max-age=180000");
    res.end(JSON.stringify(data));
  } else {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "max-age=180000");
    res.end(JSON.stringify(error));
  }
};
