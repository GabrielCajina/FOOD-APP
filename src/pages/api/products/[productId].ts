// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Product } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const product = await prisma.product.findUnique({
        where: { id: req.query.productId as string },
      });
      return res.status(200).json({ product });
  }
}
