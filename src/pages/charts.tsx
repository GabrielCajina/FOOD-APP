import { Button, Center, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NextPageLayout } from "types/layouts";
import Layout from "layouts/Layout";
import CreateProduct from "components/CreateProduct";

const Charts: NextPageLayout = () => {
  return (
    <Center
      h={"100vh"}
      w="full"
      display={"flex"}
      flexDirection="column"
      justifyContent={"center"}
    >
      <Image src="/working.svg" width={190} height={190} />
      <Text fontSize={"3xl"}>Working in this feature...</Text>
      <Button>
        <Link href={"/"}>Home</Link>
      </Button>
    </Center>
  );
};

Charts.Layout = ({ children }) => {
  return <Layout panel={<CreateProduct />}>{children}</Layout>;
};

export default Charts;
