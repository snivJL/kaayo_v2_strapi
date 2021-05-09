import React from "react";
import { Image, Flex, Text } from "@chakra-ui/react";
import WishlistDrawer from "./WishlistDrawer";
import { useSelector } from "react-redux";
const EmptyCart = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  return (
    <>
      <Flex justify="center" mb={2}>
        <Image boxSize="300px" src="/images/shopping-cart.svg"></Image>
      </Flex>
      <Text align="center" fontSize="xl" mb={2}>
        Woops, your cart is empty...
      </Text>
      {wishlist.length > 0 && <WishlistDrawer />}
    </>
  );
};

export default EmptyCart;
