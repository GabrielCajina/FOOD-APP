import { Box, Button, Circle, Flex, IconButton, Text } from "@chakra-ui/react";
import { MinusIcon, PencilIcon, PlusIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useProduct } from "../store/useProduct";
import Icon from "./Icon";

const ShoppingCartSection = () => {
  const [totalPrice, setTotalPrice] = useState<null | number>(null);
  const [isEdit, setIsEdit] = useState(false);
  const { products, setProducts, clearProducts } = useProduct();

  useEffect(() => {
    const store = localStorage.getItem("PRODUCTS");
    const storeParse = store ? JSON.parse(store) : null;
    storeParse && setProducts(storeParse.products);
  }, []);

  function handleEditCart(id: string, v: number) {
    const cart = products.find((x) => x.id === id)!;
    if (cart?.items + v <= 0) {
      setProducts([...products].filter((x) => x.id !== id));
      return;
    }
    const newProducts = [...products].map((x) =>
      x.id === id ? { ...x, items: x.items + v } : x
    );
    setProducts(newProducts);
  }
  return (
    <Flex
      p={9}
      h="full"
      flexDirection={"column"}
      boxShadow="md"
      position={"relative"}
    >
      <Flex
        alignItems={"center"}
        bgColor="brown"
        color={"white"}
        rounded="md"
        px={1.5}
      >
        <Image src={"/source.svg"} width={55} height={55} />
        <Box py={2} px={1}>
          <Text my={0.5}>Didn't find what you need?</Text>
          <Link href={`/p/create-product`}>
            <Button
              bgColor={"white"}
              color="black"
              _hover={{ bgColor: "white" }}
            >
              Add Item
            </Button>
          </Link>
        </Box>
      </Flex>

      <Flex my={8} justifyContent={"space-between"} alignItems="center">
        <Text>Shoppping List</Text>
        <IconButton aria-label="edit" onClick={() => setIsEdit((p) => !p)}>
          <Icon icon={PencilIcon} />
        </IconButton>
      </Flex>

      <Box flexGrow={1}>
        {products.map((p) => (
          <Flex
            key={p.id}
            alignItems="center"
            justifyContent={"space-between"}
            gap={4}
            mt={4}
            w="full"
          >
            <Text
              fontSize={"xl"}
              fontWeight="bold"
              w="40%"
              justifyContent={"space-between"}
            >
              {p.name}
            </Text>
            {isEdit && (
              <IconButton
                onClick={() => handleEditCart(p.id, 1)}
                aria-label="add-product"
                icon={<Icon icon={PlusIcon} />}
              />
            )}
            <Circle>{p.items}</Circle>
            {isEdit && (
              <IconButton
                onClick={() => handleEditCart(p.id, -1)}
                aria-label="remove-product"
                icon={<Icon icon={MinusIcon} />}
              />
            )}
          </Flex>
        ))}
      </Box>

      <Box mt={5}>
        {products.length === 0 ? (
          <Image src="/shop.svg" width={250} height={250} />
        ) : (
          <Flex gap={3} w={300}>
            <Button flexGrow={1} onClick={clearProducts}>
              Clear
            </Button>
            <Button
              flexGrow={1}
              bgColor={"yellow.500"}
              color="white"
              onClick={() => {
                const v = products.reduce(
                  (acc, el) => acc + el.price * el.items,
                  0
                );
                setTotalPrice(v);
              }}
            >
              buy
            </Button>
          </Flex>
        )}
      </Box>

      <Box
        position={"absolute"}
        zIndex={-1}
        background="yellow.500"
        rounded={"full"}
        w={200}
        h={200}
        mx="auto"
        top={-20}
        right={-20}
      />

      {totalPrice && (
        <Text mt={4} p={1} fontSize={"lg"} fontWeight="bold">
          Product: ${totalPrice.toFixed(2)}
        </Text>
      )}
    </Flex>
  );
};

export default ShoppingCartSection;
