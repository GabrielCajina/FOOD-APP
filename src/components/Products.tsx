import { CircularProgress, Flex, Text } from "@chakra-ui/react";
import { Product } from "@prisma/client";
import React, { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getAllProducts } from "../services/products.service";
import { useProduct } from "../store/useProduct";
import FoodSection from "./FoodSection";
import Header from "./Header";

const Products: React.FC<{}> = () => {
  const filter = useProduct((s) => s.productFilter);
  const client = useQueryClient();
  const { data, isLoading, isError } = useQuery("products", getAllProducts);

  const products = useMemo(() => {
    if (!data) return;
    if (!filter) return data?.products;
    return data?.products.map((p) => {
      const f = p.products.filter((x) => x.name.includes(filter));
      return { name: p.name, products: f };
    });
  }, [filter, data]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  return (
    <Flex
      scrollBehavior={"smooth"}
      className="scroll-none"
      as={"main"}
      p={9}
      flexDirection="column"
      overflow="scroll"
      gap={4}
      bgColor="white"
    >
      <Header />

      {products?.map((p) => (
        <FoodSection key={p.name} title={p.name} products={p.products} />
      ))}
    </Flex>
  );
};

export default Products;
