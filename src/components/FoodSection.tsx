import { Flex, Grid, GridItem, IconButton, Text, Link } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/outline";
import { Product } from "@prisma/client";
import NextLink from "next/link";
import React from "react";
import Icon from "./Icon";
import ProductCard from "./ProductCard";

const FoodSection: React.FC<{ title: string; products: Product[] }> = ({
  title,
  products,
}) => {
  if (products.length === 0) return null;
  return (
    <Flex flexDir={"column"} gap={4}>
      <Text fontSize={25} fontWeight="bold">
        {title.replaceAll("_", " ")}
      </Text>
      <Grid
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
          xl: "repeat(4,1fr)",
        }}
        gap={5}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product as any} />
        ))}
      </Grid>
    </Flex>
  );
};

export default FoodSection;
