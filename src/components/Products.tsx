import { Center, CircularProgress, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { getAllProducts } from "../services/products.service";
import { useProduct } from "../store/useProduct";
import FoodSection from "./FoodSection";
import Header from "./Header";
import Loading from "./ui/Loading";

const Products: React.FC<{}> = () => {
  const filter = useProduct((s) => s.productFilter);
  const { data, isLoading, isError } = useQuery("products", getAllProducts);

  const products = useMemo(() => {
    if (!data) return;
    if (!filter) return data?.products;
    return data?.products.map((p) => {
      const f = p.products.filter((x) =>
        x.name.toLowerCase().includes(filter.toLowerCase())
      );
      return { name: p.name, products: f };
    });
  }, [filter, data]);

  if (isError) {
    return (
      <Center display={"flex"} flex={1} flexDirection="column">
        <Image src="/error.svg" width={150} height={150} />
        <Text fontWeight={"bold"} fontSize="2xl">
          SomeThing Went Wrong
        </Text>
      </Center>
    );
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />

          {products?.map((p) => (
            <FoodSection key={p.name} title={p.name} products={p.products} />
          ))}
        </>
      )}
    </Flex>
  );
};

export default Products;
