import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { clearCart } from "../../store/order/orderSlice";
import Coupon from "./Coupon";
import { VND } from "../../lib/utils";
import ProductQtyForm from "./ProductQtyForm";

const OrderSummary = ({ style }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.order.cart);
  const price = useSelector((state) => state.order.price);
  return (
    <Flex
      py={4}
      px={12}
      bg="white"
      direction="column"
      style={{ height: "fit-content", position: "sticky" }}
    >
      <Heading as="h2" fontSize="lg">
        Order Summary
      </Heading>
      <Flex my={4} direction="column">
        {cart && cart.length > 0 ? (
          cart.map((i, index) => (
            <Flex
              key={index}
              align="center"
              h="fit-content"
              py={4}
              justify="space-between"
            >
              <Box w="20%">
                <Image
                  src="/images/christopher.png"
                  alt="Picture of the product"
                  width={80}
                  height={100}
                />
              </Box>

              <Stack px={6} align="center" w="60%">
                <Text>{i.product.name}</Text>
                <Text>{i.product.category}</Text>
              </Stack>
              <Stack w="20%" align="start">
                <Text>
                  {VND()}
                  {i.product.price}
                </Text>
                <ProductQtyForm item={i} index={index} />
                <Button
                  fontSize="sm"
                  variant="link"
                  onClick={() => dispatch(clearCart(i.product.id))}
                >
                  Remove
                </Button>
              </Stack>
            </Flex>
          ))
        ) : (
          <Text>Cart is empty</Text>
        )}
      </Flex>
      <Coupon />
      <Flex my={4} direction="column">
        <Flex color="gray.500" justify="space-between">
          <Text>Subtotal</Text>
          <Text>
            {VND()}
            {price}
          </Text>
        </Flex>
        <Flex color="gray.500" justify="space-between">
          <Text>Shipping</Text>
          <Text>{VND()}40000</Text>
        </Flex>
        <Flex my={2} justify="space-between">
          <Text>Total</Text>
          <Text>
            {VND()}
            {price + 40000}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OrderSummary;
