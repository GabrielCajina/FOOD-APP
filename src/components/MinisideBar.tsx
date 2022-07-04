import { Box, Circle, Flex, IconButton, WrapItem } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Icon from "./Icon";
import {
  ArrowLeftIcon,
  ChartSquareBarIcon,
  HomeIcon,
  LogoutIcon,
  MenuIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useProduct } from "../store/useProduct";
import { logout } from "services/auth.service";
import MiniSideBarIcon from "./ui/MiniSideBarIcon";

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
      boxShadow={"lg"}
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
        <MiniSideBarIcon icon={HomeIcon} href="/" label="menu-icon" />
        <IconButton onClick={() => router.back()} aria-label="back">
          <Icon icon={ArrowLeftIcon} />
        </IconButton>
        <MiniSideBarIcon
          label="charts"
          icon={ChartSquareBarIcon}
          href="/charts"
        />
        <MiniSideBarIcon
          label="create-product"
          icon={PlusIcon}
          href="/p/create-product"
        />
        <IconButton
          aria-label="charts"
          onClick={async () => {
            const response = await logout();
            if (response.ok) {
              router.replace("/auth/login");
            }
          }}
        >
          <Icon icon={LogoutIcon} />
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
