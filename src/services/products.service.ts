import { Product } from "@prisma/client";
import { Axios } from "./axios";

export const getAllProducts = async () => {
  const { data } = await Axios.get<{
    products: { name: string; products: Product[] }[];
  }>("/api/products");
  return data;
};

export const getOneProduct = async (productId: string) => {
  const { data } = await Axios.get<{ product: Product }>(
    `/api/products/${productId}`
  );
  return data;
};

export const createProduct = async (productData: Product) => {
  const { data } = await Axios.post<Product>("/api/products", productData);
  return data;
};
