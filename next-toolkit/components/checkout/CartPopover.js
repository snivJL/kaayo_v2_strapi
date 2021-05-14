import React from "react";
import Link from "next/link";
import {
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  VStack,
  Flex,
  Box,
  Image,
  Text,
  StackDivider,
  Button,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { formatPrice } from "../../lib/utils";
import { clearCart } from "../../store/order/orderSlice";
import { useDispatch } from "react-redux";

const CartPopover = () => {
  const cart = useSelector((state) => state.order.cart);
  const dispatch = useDispatch();
  const toast = useToast();
  return (
    <Popover variant="responsive" size="lg">
      <PopoverTrigger>
        <IconButton
          variant="ghost"
          aria-label="View my cart"
          icon={<FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>}
        ></IconButton>
      </PopoverTrigger>
      <PopoverContent p={4} mr={4}>
        <PopoverArrow ml={2} />
        <PopoverCloseButton />
        <PopoverBody>
          <VStack divider={<StackDivider mx={0} borderColor="gray.200" />}>
            <Box w="100%">
              {cart && cart.length > 0 ? (
                <>
                  {cart.map((i) => (
                    <Flex
                      align="center"
                      key={i.product.id}
                      justify="space-between"
                      mb={4}
                      py={4}
                    >
                      <Image
                        src={i.product.images[0].name}
                        alt="Picture of the product"
                        borderRadius="base"
                        w="50px"
                        h="70px"
                      />
                      <VStack align="start" w="35%">
                        <Text>{i.product.name}</Text>
                        <Text fontSize="sm">Qty: {i.qty}</Text>
                      </VStack>
                      <Text fontSize="sm">
                        &#8363;{formatPrice(i.product.price)}
                      </Text>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        as={Button}
                        onClick={() => {
                          dispatch(clearCart(i.product.id));
                          toast({
                            title: `${i.product.name} has been removed from your cart`,
                            status: "success",
                          });
                        }}
                        aria-label="Remove item from cart"
                        icon={<DeleteIcon />}
                      />
                    </Flex>
                  ))}
                  <VStack w="100%">
                    <Flex
                      w="100%"
                      align="center"
                      justify="space-between"
                      mb={4}
                    >
                      <Text>Total:</Text>
                      <Text>
                        &#8363;{formatPrice(localStorage.getItem("orderPrice"))}
                      </Text>
                    </Flex>
                    <Flex align="center" w="100%" justify="space-between">
                      <Button variant="main">
                        <Link href="/cart">View Cart</Link>
                      </Button>
                      <Button variant="main">
                        <Link href="/checkout">Checkout</Link>
                      </Button>
                    </Flex>
                  </VStack>
                </>
              ) : (
                <Text w="fit-content">Your cart is empty</Text>
              )}
            </Box>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CartPopover;
