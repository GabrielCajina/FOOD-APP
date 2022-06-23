import { Box, Circle, Flex, IconButton, WrapItem } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Icon from "./Icon";
import {
  ArrowLeftIcon,
  ChartSquareBarIcon,
  MenuIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useProduct } from "../store/useProduct";

const MinisideBar = () => {
  const router = useRouter();
  const { products } = useProduct();
  return (
    <Flex
      p={5}
      bgColor={"white"}
      h="full"
      w={"full"}
      flexDirection="column"
      justifyContent={"space-between"}
      alignItems="center"
      boxShadow={"md"}
    >
      <Image
        src="/logo.svg"
        width={75}
        height={75}
        onClick={() => router.replace("/")}
      />

      <Flex
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        gap={8}
      >
        <IconButton aria-label="menu-icon" onClick={() => router.push("/")}>
          <Icon icon={MenuIcon} />
        </IconButton>
        <IconButton onClick={() => router.back()} aria-label="back">
          <Icon icon={ArrowLeftIcon} />
        </IconButton>
        <IconButton aria-label="charts">
          <Icon icon={ChartSquareBarIcon} />
        </IconButton>
      </Flex>

      <WrapItem position={"relative"}>
        <IconButton
          bgColor={"yellow.400"}
          rounded="full"
          color={"white"}
          aria-label="shopping-cart"
          icon={<Icon icon={ShoppingCartIcon} />}
        />
        {products.length > 0 && (
          <Circle
            borderRadius={"full"}
            position={"absolute"}
            bottom={-3.5}
            right={-2}
            rounded="full"
            bgColor="green.300"
            px={3}
            py={1}
          >
            {products.length}
          </Circle>
        )}
      </WrapItem>
    </Flex>
  );
};

export default MinisideBar;
