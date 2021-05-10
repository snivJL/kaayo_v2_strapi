import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import FilterBar from "./FilterBar";
import SortBar from "./SortBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/product/productSlice";

const ShopPanel = () => {
  const dispatch = useDispatch();
  const filterBy = useSelector((state) => state.product.filterBy);
  const sortBy = useSelector((state) => state.product.sortBy);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [filterBy, sortBy.cat, sortBy.type]);
  return (
    <Flex align="center" borderRadius="4px" bg="primary.500" mb={8}>
      <FilterBar />
      <SortBar />
    </Flex>
  );
};

export default ShopPanel;
