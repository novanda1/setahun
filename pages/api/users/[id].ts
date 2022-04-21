import { updateUserHandler } from "lib/handlers/userHandlers";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (req.method === "PUT") {
    updateUserHandler(req, res, id);
  } else if (req.method === "DELETE") {
    updateUserHandler(req, res, id);
  } else {
    res.end();
  }
}
