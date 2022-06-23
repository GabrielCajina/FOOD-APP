import React from "react";
import CreateProduct from "../../components/CreateProduct";
import Products from "../../components/Products";
import Layout from "../../layouts/Layout";
import { NextPageLayout } from "../../types/layouts";

const Product: NextPageLayout = () => {
  return <Products />;
};

Product.Layout = ({ children }) => {
  return <Layout panel={<CreateProduct />}>{children}</Layout>;
};

export default Product;
