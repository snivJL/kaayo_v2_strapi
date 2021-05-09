import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroBreadcrumb from "../components/HeroBreadcrumb";
import {
  Heading,
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import { useSelector, useDispatch } from "react-redux";
import { updateCart, clearCart } from "../store/order/orderSlice";
import ProductQtyForm from "../components/checkout/ProductQtyForm";
import EmptyCart from "../components/checkout/EmptyCart";
import { SHIPPING_PRICE } from "../lib/utils";
import { useRouter } from "next/router";

const Cart = () => {
  let cart = useSelector((state) => state.order.cart);
  let cartPrice = useSelector((state) => state.order.price);
  const router = useRouter();

  const dispatch = useDispatch();
  const [qty, setQty] = useState(cart);
  const handleChange = (index, value) => {
    const newArray = [...qty];
    newArray[index] = { ...newArray[index], qty: value };
    setQty(newArray);
    dispatch(updateCart(newArray));
  };
  return (
    <>
      <HeroBreadcrumb path="cart" />
      <Wrapper>
        {cart.length > 0 ? (
          <>
            <Heading as="h1" fontSize="xl">
              Your cart items
            </Heading>
            <Table mt={6} size="md">
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Product Name</Th>
                  <Th> Unit Price</Th>
                  <Th> Qty</Th>
                  <Th> Subtotal</Th>
                  <Th> Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cart && cart.length > 0 ? (
                  cart.map((item, index) => (
                    <Tr key={index}>
                      <Td>
                        <Image
                          src="/images/christopher.png"
                          alt="Picture of the product"
                          width={100}
                          height={120}
                        />
                      </Td>
                      <Td>{item.product.name}</Td>
                      <Td>
                        &#8363;
                        {item.product.price}
                      </Td>
                      <Td>
                        <ProductQtyForm item={item} index={index} width="33%" />
                      </Td>
                      <Td>
                        &#8363;
                        {item.product.price * item.qty}
                      </Td>
                      <Td>Action</Td>
                    </Tr>
                  ))
                ) : (
                  <Text>Cart is empty</Text>
                )}
              </Tbody>
            </Table>
            <Flex justify="space-between" mt={6}>
              <Button px={12} py={6} borderRadius="9999px">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button
                px={12}
                py={6}
                borderRadius="9999px"
                onClick={() => dispatch(clearCart())}
              >
                Clear Shopping cart
              </Button>
            </Flex>
            <SimpleGrid
              className="cart-grid"
              my={6}
              columns={[1, null, 3]}
              spacing="40px"
            >
              <Flex direction="column" bg="green.100" py={4} px={8}>
                <Heading as="h2" py={4} color="gray.800" fontSize="lg">
                  Shipping
                </Heading>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                  voluptatibus dolorum explicabo
                </Text>
              </Flex>
              <Flex direction="column" bg="green.100" py={4} px={8}>
                <Heading as="h2" py={4} color="gray.800" fontSize="lg">
                  Use Coupon Code
                </Heading>
                <Text>Enter your coupon code if you have one.</Text>
                <Input my={2} bg="white"></Input>
                <Button mt="auto">Apply Coupon</Button>
              </Flex>
              <Flex direction="column" bg="green.100" py={4} px={8}>
                <Heading as="h2" py={4} color="gray.800" fontSize="lg">
                  Cart Total
                </Heading>
                <Flex my={2} justify="space-between">
                  <Text>Total Products</Text>
                  <Text> &#8363;{cartPrice}</Text>
                </Flex>
                <Flex
                  my={2}
                  fontSize="lg"
                  fontWeight="bold"
                  color="green.900"
                  justify="space-between"
                >
                  <Text>Grand Total</Text>
                  <Text>&#8363;{cartPrice + SHIPPING_PRICE}</Text>
                </Flex>
                <Button variant="main" onClick={() => router.push("/checkout")}>
                  Proceed To Checkout
                </Button>
              </Flex>
            </SimpleGrid>
          </>
        ) : (
          <EmptyCart />
        )}
      </Wrapper>
    </>
  );
};

export default Cart;
