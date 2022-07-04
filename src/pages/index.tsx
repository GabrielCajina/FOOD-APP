import { withAuth } from "auth/withAuth";
import { GetServerSideProps } from "next";
import React from "react";
import Products from "../components/Products";
import ShoppingCartSection from "../components/ShoppingCartSection";
import Layout from "../layouts/Layout";
import { NextPageLayout } from "../types/layouts";

const Home: NextPageLayout = ({}) => {
  return <Products />;
};

Home.Layout = ({ children }) => {
  return <Layout panel={<ShoppingCartSection />}>{children}</Layout>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = withAuth();
