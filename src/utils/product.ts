import { Product } from ".prisma/client";

type ProductResponse = { name: string; products: Product[] }[];

export const mapProducts = (products: Product[]): ProductResponse => {
  const productsMapped: ProductResponse = [];

  products.forEach((p) => {
    const pr = productsMapped.find((m) => m.name === p.category);
    pr
      ? pr.products.push(p)
      : productsMapped.push({ name: p.category, products: [p] });
  });

  return productsMapped;
};

export const productToCart = (
  products: (Product & { items: number })[],
  newProduct: Product
) => {
  const productSelected = products.find((pr) => pr.id === newProduct.id);

  if (!productSelected)
    return {
      products: [{ ...newProduct, items: 1 }, ...products],
    };

  return {
    products: [...products].map((p) =>
      p.id === productSelected.id
        ? { ...productSelected, items: productSelected.items + 1 }
        : p
    ),
  };
};
