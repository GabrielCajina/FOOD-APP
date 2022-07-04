import { serialize } from "cookie";
import { isAuth } from "middleware/isAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Set-Cookie", serialize("jid", "", { maxAge: -1, path: "/" }));

  res.status(200).json({ ok: true });
}
