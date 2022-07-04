import { Product } from "@prisma/client";
import React from "react";
import { useMutation } from "react-query";
import { createProduct } from "services/products.service";

const useCreateProduct = () => {
  return useMutation<Product, any, Product>(createProduct);
};

export default useCreateProduct;
