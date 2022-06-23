// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { mapProducts } from "../../../utils/product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const data = await prisma.product.findMany();
      const products = mapProducts(data);

      return res.status(200).json({ products });
    case "POST":
      const { name, price, url, category, description } = req.body;
      const isValid = await prisma.product.findUnique({ where: { name } });

      if (isValid) {
        return res
          .status(400)
          .json({ field: "name", message: "The name is taken" });
      }

      const product = await prisma.product.create({
        data: { name, price, url, category, description },
      });
      return res.status(201).json({ product });
  }
}
