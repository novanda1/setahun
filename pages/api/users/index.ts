import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { isNipRegistered } from "lib/api/utils";
import { createUserHandler, getUsersHandler } from "lib/handlers/userHandlers";
import { CreateUserDTO } from "lib/types/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // loggedInMiddleware(req, res)
  // adminMiddleware(req, res)

  if (req.method === "POST") {
    // body validation
    const body = JSON.parse(req.body);
    const input: CreateUserDTO = plainToClass(CreateUserDTO, body);
    const errors = await validate(input).then((errors) => {
      if (errors.length > 0) {
        return errors;
      } else {
        return;
      }
    });

    if (errors && errors?.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    // nip must unique
    if (await isNipRegistered(input.user_metadata.nip)) {
      res.status(200).json({ error: { message: "nip already registered" } });
      return;
    }

    createUserHandler(req, res, input);
    return;
  } else {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "max-age=180000");
    res.end(JSON.stringify({ error: { message: "method not allowed" } }));
  }
}
