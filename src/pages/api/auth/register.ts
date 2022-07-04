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

  const user = await prisma.user.create({
    data: { email, password: await argon.hash(password) },
    select: { password: false, id: true, email: true },
  });

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

  res.status(201).json({ user });
}
