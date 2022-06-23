import { Product } from "@prisma/client";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteOneProduct } from "../services/products.service";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<{ product: Product }, any, string>(deleteOneProduct, {
    onSuccess: ({ product }) => {
      const { products } = queryClient.getQueryData<{
        products: { name: string; products: Product[] }[];
      }>("products") ?? { products: [] };

      const section = products.find((c) => c.name === product.category);
      if (!section) return;
      section.products = section?.products.filter((p) => p.id !== product.id);
    },
  });
};

export default useDeleteProduct;
