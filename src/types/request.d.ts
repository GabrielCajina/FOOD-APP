import { User } from "@prisma/client";
import { NextApiRequest } from "next";

export type NextRequestAuth = NextApiRequest & { user: User };
