import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { createProduct } from "../services/products.service";
import { schema } from "../utils/schema";
import TextInput from "./ui/TextInput";

const CreateProduct = () => {
  const {
    register,
    getValues,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<Product>();

  const router = useRouter();
  const toast = useToast();

  const onSubmit = async () => {
    clearErrors();
    const form = getValues();
    try {
      const isValid = await schema.validate(form);
      console.log(isValid);
    } catch (error: any) {
      setError(error.path, { message: error.errors[0] });
      return;
    }

    createProduct({
      ...form,
      price: parseFloat(String(form.price)),
    })
      .then((r) => {
        if (r) {
          router.push("/");
          toast({
            title: "Product created.",
            description: "We've created your product for you.",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        }
      })
      .catch((e) => {
        const { field, message } = e.response.data;
        setError(field, { message });
      });
  };

  return (
    <Flex
      p={9}
      flexDir={"column"}
      gap={8}
      bgColor="white"
      boxShadow={"md"}
      h="full"
    >
      <Text fontWeight={"bold"} fontSize={22}>
        Add new Item
      </Text>

      <TextInput
        errors={errors}
        label={"Name"}
        placeholder="Enter a name"
        {...register("name")}
      />

      <TextInput
        errors={errors}
        label={"Note (optional)"}
        placeholder="Enter a note"
        {...register("description")}
      />

      <TextInput
        errors={errors}
        label={"Price"}
        placeholder="Enter a price"
        {...register("price")}
      />

      <TextInput
        errors={errors}
        label="Image (optional)"
        placeholder="Enter a uri"
        {...register("url")}
      />

      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select
          isInvalid={!!errors.category}
          placeholder="Enter a category"
          {...register("category")}
        >
          <option value="FRUIT_AND_VEGETABLES">Fruit and vegetables</option>
          <option value="MEAT_AND_FISH">Meat and fish</option>
          <option value="BEVERAGES">Beverages</option>
        </Select>
      </FormControl>

      <Button
        onClick={onSubmit}
        _hover={{ bgColor: "yellow.500" }}
        bgColor={"yellow.400"}
      >
        Save
      </Button>
    </Flex>
  );
};

export default CreateProduct;
