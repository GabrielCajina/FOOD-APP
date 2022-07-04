import argon from "argon2";
import { serialize } from "cookie";
import { prisma } from "db";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { __prod__ } from "utils/constant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "User not exist" });
  }
  const isValid = await argon.verify(user.password, password);

  if (!isValid) {
    return res.status(404).json({ message: "Bad login" });
  }

  const token = jwt.sign({ user: user.id }, process.env.JWT_KEY!, {
    expiresIn: "1h",
  });

  res.setHeader(
    "Set-Cookie",
    serialize("jid", token, {
      httpOnly: true,
      secure: __prod__,
      sameSite: "lax",
      path: "/",
    })
  );

  const { password: _, ...u } = user;

  res.status(201).json({ user: u });
}
