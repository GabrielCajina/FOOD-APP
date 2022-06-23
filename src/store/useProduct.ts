import { Product } from "@prisma/client";
import create from "zustand";
import { productToCart } from "../utils/product";

interface UseProduct {
  productFilter?: string | undefined;
  products: (Product & { items: number })[];
  addProduct: (p: Product) => void;
  setProducts: (p: (Product & { items: number })[]) => void;
  setFilter: (value: string) => void;
  clearProducts: () => void;
}

export const useProduct = create<UseProduct>((set) => ({
  setFilter: (value: string) => set({ productFilter: value }),
  products: [],
  addProduct: (newProduct) =>
    set((state) => {
      const products = productToCart(state.products, newProduct);
      localStorage.setItem("PRODUCTS", JSON.stringify(products));
      return products;
    }),
  setProducts: (products) => set(() => ({ products: products })),
  clearProducts: () => {
    set({ products: [] });
    localStorage.removeItem("PRODUCTS");
  },
}));
