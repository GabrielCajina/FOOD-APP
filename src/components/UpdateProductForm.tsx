import { Button, Flex, Text } from "@chakra-ui/react";
import { Product } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { editProduct } from "../services/products.service";
import TextInput from "./ui/TextInput";

const UpdateProductForm: React.FC<{
  product: Product;
  onUpdate: Function;
}> = ({ product, onUpdate }) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<Product>();
  return (
    <>
      <Flex as="form" flexDirection={"column"}>
        <Text fontSize={27} fontWeight="bold" py={4}>
          Edit Product
        </Text>
        <TextInput
          errors={errors}
          label={"Name"}
          placeholder="Enter a name"
          {...register("name", { value: product.name })}
        />

        <TextInput
          errors={errors}
          label={"Note (optional)"}
          placeholder="Enter a note"
          {...register("description", { value: product.description })}
        />

        <TextInput
          errors={errors}
          label={"Price"}
          placeholder="Enter a price"
          {...register("price", { value: product.price })}
        />

        <TextInput
          errors={errors}
          label="Image (optional)"
          placeholder="Enter a uri"
          {...register("url", { value: product.url })}
        />
      </Flex>

      <Button
        onClick={async () => {
          const response = await editProduct(product.id, {
            ...getValues(),
            category: product.category,
          });
          if (response) {
            onUpdate();
          }
        }}
      >
        Save
      </Button>
    </>
  );
};

export default UpdateProductForm;
