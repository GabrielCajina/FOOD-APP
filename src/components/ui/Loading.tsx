import { CircularProgress, Flex } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Flex flexGrow={1} justifyContent="center" alignItems={"center"}>
      <CircularProgress />
    </Flex>
  );
};

export default Loading;
