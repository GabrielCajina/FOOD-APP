import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import ProductData from "../../components/ProductData";
import Products from "../../components/Products";
import Layout from "../../layouts/Layout";
import { getOneProduct } from "../../services/products.service";
import { NextPageLayout } from "../../types/layouts";

const Product: NextPageLayout = () => {
  return <Products />;
};

Product.Layout = ({ children }) => {
  return <Layout panel={<ProductData />}>{children}</Layout>;
};

export default Product;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("x", () =>
    getOneProduct(query.productId as string)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
