import { GridItem, IconButton, Link } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/outline";
import { Product } from "@prisma/client";
import NextLink from "next/link";
import React from "react";
import { useProduct } from "../store/useProduct";
import { Text } from "@chakra-ui/react";
import Icon from "./Icon";
import { useMenu } from "../store/useMenu";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addProduct, products } = useProduct();
  const setIsOpen = useMenu((s) => s.setIsOpen);

  return (
    <GridItem
      minH={20}
      position={"relative"}
      key={product.id}
      as="div"
      p={3}
      bgColor="gray.200"
      rounded={"md"}
      _hover={{ bgColor: "gray.300" }}
      transition="all"
    >
      <NextLink href={`/p/${product.id}`}>
        <Link cursor={"pointer"}>{product.name}</Link>
      </NextLink>

      <Text as="p" fontWeight={"bold"} mt={1}>
        ${product.price}
      </Text>

      <IconButton
        onClick={() => {
          addProduct(product);
        }}
        top={2}
        right={4}
        position={"absolute"}
        aria-label="add-product"
        icon={<Icon icon={PlusIcon} />}
      />
    </GridItem>
  );
};

export default ProductCard;
