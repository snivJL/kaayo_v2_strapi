import React from "react";
import Image from "next/image";
import {
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  VStack,
  Flex,
  Box,
  Text,
  StackDivider,
  Button,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const CartPopover = () => {
  const cart = useSelector((state) => state.order.cart);
  console.log(cart);
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label="View my cart"
          icon={<FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>}
        ></IconButton>
      </PopoverTrigger>
      <PopoverContent p={4}>
        <PopoverArrow />
        <PopoverCloseButton />
        {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
        <PopoverBody>
          <VStack divider={<StackDivider mx={0} borderColor="gray.200" />}>
            <Box w="100%">
              {cart.length > 0 ? (
                cart.map((i) => (
                  <Flex align="center" justify="space-around" mb={2}>
                    <Image
                      src="/images/christopher.png"
                      alt="Picture of the product"
                      width={100}
                      height={120}
                    />
                    <VStack>
                      <Text>{i.product.name}</Text>
                      <Text fontSize="sm">Qty: {i.qty}</Text>
                      <Text fontSize="sm">&#8363;{i.product.price}</Text>
                    </VStack>
                  </Flex>
                ))
              ) : (
                <Text>No items in cart</Text>
              )}
            </Box>
            <VStack w="100%">
              <Flex w="100%" align="center" justify="space-between">
                <Text>Total:</Text>
                <Text>&#8363;{cart.totalPrice}</Text>
              </Flex>
              <Button>View Cart</Button>
              <Button>Checkout</Button>
            </VStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CartPopover;
