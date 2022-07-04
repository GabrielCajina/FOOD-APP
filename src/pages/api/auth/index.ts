import { isAuth } from "middleware/isAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await isAuth(req.cookies.jid);

  if (!user) {
    return res.status(400).json({ auth: false });
  }

  res.status(200).json({ user });
}
