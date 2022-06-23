// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { schema } from "../../../utils/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const product = await prisma.product.findUnique({
        where: { id: req.query.productId as string },
      });
      return res.status(200).json({ product });
    }
    case "DELETE": {
      const productId = req.query.productId as string;
      const product = await prisma.product.findUnique({
        where: { id: productId as string },
      });

      if (!product) {
        return res.status(404).json({ message: "The product not exist" });
      }
      await prisma.product.delete({ where: { id: productId } });

      return res.status(200).json({ product });
    }
    case "PUT": {
      const isValid = await schema.isValid(req.body);
      if (!isValid) {
        return res.status(400).json({ message: "The body is not valid" });
      }
      const productId = req.query.productId as string;
      const product = await prisma.product.update({
        where: { id: productId as string },
        data: req.body,
      });

      res.status(200).json({ product });
    }
  }
}
