import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { adminMiddleware, loggedInMiddleware } from 'lib/api/middleware'
import { createUserHandler, getUsersHandler } from 'lib/api/users/handler'
import { isNipRegistered } from 'lib/api/utils'
import { CreateUserDTO } from 'lib/types/User'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  loggedInMiddleware(req, res)
  adminMiddleware(req, res)

  if (req.method === "POST") {
    // body validation
    const input: CreateUserDTO = plainToClass(CreateUserDTO, req.body)
    const errors = await validate(input).then(errors => {
      if (errors.length > 0) {
        return errors
      } else {
        return
      }
    });

    if (errors && errors?.length > 0) {
      res.status(200).json({ errors })
      return
    }

    // nip must unique
    if (await isNipRegistered(input.user_metadata.nip)) {
      res.status(200).json({ error: { message: "nip already registered" } })
      return;
    }

    createUserHandler(req, res, input)
    return
  } else { // GET
    getUsersHandler(req, res)
    return
  }
}
