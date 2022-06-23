import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";
import { PencilIcon } from "@heroicons/react/outline";
import { Product } from "@prisma/client";
import NextImage from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import useDeleteProduct from "../hooks/useDeleteProduct";
import { editProduct, getOneProduct } from "../services/products.service";
import Icon from "./Icon";
import TextInput from "./ui/TextInput";

const ProductData = () => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useQuery(
    ["product", router.query.productId],
    () => getOneProduct(router.query.productId as string)
  );
  const { mutateAsync } = useDeleteProduct();
  const toast = useToast();
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<Product>();

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

      {!isEdit ? (
        <>
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
        </>
      ) : (
        <Flex as="form" flexDirection={"column"}>
          <Text fontSize={27} fontWeight="bold" py={4}>
            Edit Product
          </Text>
          <TextInput
            errors={errors}
            label={"Name"}
            placeholder="Enter a name"
            {...register("name", { value: data.product.name })}
          />

          <TextInput
            errors={errors}
            label={"Note (optional)"}
            placeholder="Enter a note"
            {...register("description", { value: data.product.description })}
          />

          <TextInput
            errors={errors}
            label={"Price"}
            placeholder="Enter a price"
            {...register("price", { value: data.product.price })}
          />

          <TextInput
            errors={errors}
            label="Image (optional)"
            placeholder="Enter a uri"
            {...register("url", { value: data.product.url })}
          />
        </Flex>
      )}
      <Flex alignItems={"center"} gap={4} mt={8}>
        <Button
          onClick={async () => {
            const response = await mutateAsync(data.product.id);
            if (response) {
              toast({
                title: "Product remove.",
                description: "We've remove your product for you.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });

              router.replace("/");
            }
          }}
        >
          Delete
        </Button>
        {!isEdit ? (
          <Button
            leftIcon={<Icon icon={PencilIcon} />}
            bgColor={"yellow.400"}
            onClick={() => setIsEdit((p) => !p)}
          >
            Edit
          </Button>
        ) : (
          <Button
            onClick={async () => {
              const response = await editProduct(data.product.id, getValues());
              if (response) {
                setIsEdit(false);
                refetch();
              }
            }}
          >
            Save
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default ProductData;
