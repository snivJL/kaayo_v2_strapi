import React from "react";
import Image from "next/image";
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
  Text,
  StackDivider,
  Button,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { formatPrice } from "../../lib/utils";

const WishlistPopover = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  return (
    <Popover size="lg">
      <PopoverTrigger>
        <IconButton
          variant="ghost"
          aria-label="View my wishlist"
          icon={
            <FontAwesomeIcon
              // color="red"
              icon={faHeart}
              style={{ opacity: "100%" }}
            ></FontAwesomeIcon>
          }
        ></IconButton>
      </PopoverTrigger>
      <PopoverContent p={4} mr={4}>
        <PopoverArrow ml={2} />
        <PopoverCloseButton />
        <PopoverBody>
          <VStack divider={<StackDivider mx={0} borderColor="gray.200" />}>
            <Box w="100%">
              {wishlist && wishlist.length > 0 ? (
                wishlist.map((product) => (
                  <Flex align="center" key={product.id} justify="start" mb={2}>
                    <Image
                      src="/images/christopher.png"
                      alt="Picture of the product"
                      width={100}
                      height={120}
                    />
                    <VStack ml="auto" pr={4} align="start">
                      <Text>{product.name}</Text>
                      <Text fontSize="sm">
                        &#8363;{formatPrice(product.price)}
                      </Text>
                    </VStack>
                  </Flex>
                ))
              ) : (
                <Text>No items in wishlist</Text>
              )}
            </Box>
            <VStack w="100%">
              <Flex align="center" w="100%" justify="space-between">
                <Button variant="main">
                  <Link href="/cart">View Cart</Link>
                </Button>
                <Button variant="main">
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </Flex>
            </VStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default WishlistPopover;
