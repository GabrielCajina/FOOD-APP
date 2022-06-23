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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import useDeleteProduct from "../hooks/useDeleteProduct";
import { editProduct, getOneProduct } from "../services/products.service";
import { useMenu } from "../store/useMenu";
import Icon from "./Icon";
import Loading from "./ui/Loading";
import TextInput from "./ui/TextInput";
import UpdateProductForm from "./UpdateProductForm";

const ProductData = () => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useQuery(
    ["product", router.query.productId],
    () => getOneProduct(router.query.productId as string)
  );
  const setIsOpen = useMenu((s) => s.setIsOpen);
  const { mutateAsync } = useDeleteProduct();
  const toast = useToast();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, [router.query.productId]);

  if (isLoading) {
    return (
      <Flex h="full">
        <Loading />
      </Flex>
    );
  }

  if (isError) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <Flex p={9} flexDirection="column" gap={5} boxShadow="md" h="full" w="full">
      {data?.product ? (
        <>
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

              <Text as="p">${data.product.price}</Text>

              <Text as="span">{data.product.description}</Text>
            </>
          ) : (
            <UpdateProductForm
              product={data.product}
              onUpdate={() => {
                setIsEdit(false);
                refetch();
              }}
            />
          )}
          {!isEdit && (
            <>
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
            </>
          )}
          <Button
            leftIcon={<Icon icon={PencilIcon} />}
            bgColor={"yellow.400"}
            onClick={() => setIsEdit((p) => !p)}
          >
            {isEdit ? "Cancel" : "Edit"}
          </Button>
        </>
      ) : (
        <Text fontWeight={"bold"} fontSize="lg">
          No data available
        </Text>
      )}
    </Flex>
  );
};

export default ProductData;
