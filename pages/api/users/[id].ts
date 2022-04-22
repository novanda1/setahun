import {
  deleteUserByIdHandler,
  getUserByIdHandler,
  updateUserHandler,
} from "lib/handlers/userHandlers";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") getUserByIdHandler(req, res);
  else if (req.method === "PUT") updateUserHandler(req, res);
  else if (req.method === "DELETE") deleteUserByIdHandler(req, res);
  else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "max-age=180000");
    res.end(JSON.stringify({ error: { message: "method not allowed" } }));
  }
}
