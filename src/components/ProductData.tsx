import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  CircularProgress,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { getOneProduct } from "../services/products.service";

const ProductData = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(
    ["product", router.query.productId],
    () => getOneProduct(router.query.productId as string)
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Text>Something went wrong</Text>;
  }

  if (!data?.product) {
    return <Text>No data available</Text>;
  }

  return (
    <Flex p={9} flexDirection="column" gap={5} boxShadow="md" h="full">
      <Button
        variant={"outline"}
        bgColor={"white"}
        color="yellow.800"
        w="min-content"
        onClick={() => router.back()}
      >
        Back
      </Button>

      <Image
        as={"img"}
        borderRadius="sm"
        bgColor={"gray.200"}
        src={data!.product.url!}
      />

      <Text as="h2" fontSize={"3xl"} fontWeight="bold">
        {data.product.name.toUpperCase()}
      </Text>

      <Text as="p">{data.product.price}</Text>

      <Text as="span">{data.product.description}</Text>

      <Flex alignItems={"center"} gap={4} mt={8}>
        <Button>Delete</Button>
        <Button bgColor={"yellow.400"}>Add</Button>
      </Flex>
    </Flex>
  );
};

export default ProductData;
