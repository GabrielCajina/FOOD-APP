import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const ShoppingCard: React.FC<{ name: string; items: number }> = ({
  name,
  items,
}) => {
  return (
    <Flex alignItems={"center"} p={4} justifyContent="space-between">
      <Text>{name}</Text>
      <Text
        borderRadius={"full"}
        color="yellow.500"
        borderColor="yellow.500"
        borderWidth={2}
        w={45}
        textAlign="center"
      >
        {items}
      </Text>
    </Flex>
  );
};

export default ShoppingCard;
