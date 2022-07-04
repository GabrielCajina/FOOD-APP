import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../db";

type AuthPayload = JwtPayload & { user: string };

export const isAuth = async (token: string) => {
  if (!token) {
    return null;
  }

  let payload: AuthPayload;

  try {
    payload = jwt.verify(token, process.env.JWT_KEY!) as AuthPayload;
  } catch (error: any) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id: payload.user },
    select: { password: false, id: true, email: true },
  });

  if (!user) {
    return null;
  }
  return user;
};
