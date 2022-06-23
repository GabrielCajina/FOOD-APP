import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@heroicons/react/outline";
import React from "react";
import { useProduct } from "../store/useProduct";
import Icon from "./Icon";

const Header = () => {
  const setProductFilter = useProduct((s) => s.setFilter);
  return (
    <Flex
      h={"120px"}
      justifyContent="space-between"
      display={{ base: "none", xl: "flex" }}
    >
      <Text fontSize={28} maxW={"55%"}>
        <Text as="span" color={"yellow.500"} fontWeight="bold">
          Shoppingify
        </Text>{" "}
        allows you take your shopping list wherever you go
      </Text>

      <InputGroup maxW={"40%"}>
        <InputLeftElement children={<Icon icon={SearchIcon} />} />
        <Input
          onChange={(e) => {
            setProductFilter(e.target.value!);
          }}
          type="text"
          placeholder="Search item"
        />
      </InputGroup>
    </Flex>
  );
};

export default Header;
