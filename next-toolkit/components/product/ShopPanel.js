import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import FilterBar from "./FilterBar";
import SortBar from "./SortBar";
import { useSelector } from "react-redux";
const ShopPanel = () => {
  return (
    <Flex align="center" borderRadius="4px" bg="primary.500" mb={8}>
      <FilterBar />
      <SortBar />
    </Flex>
  );
};

export default ShopPanel;
