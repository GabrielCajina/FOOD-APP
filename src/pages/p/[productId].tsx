import { withAuth } from "auth/withAuth";
import { GetServerSideProps } from "next";
import React from "react";
import ProductData from "../../components/ProductData";
import Products from "../../components/Products";
import Layout from "../../layouts/Layout";
import { NextPageLayout } from "../../types/layouts";

const Product: NextPageLayout = () => {
  return <Products />;
};

Product.Layout = ({ children }) => {
  return <Layout panel={<ProductData />}>{children}</Layout>;
};

export default Product;

export const getServerSideProps: GetServerSideProps = withAuth();
