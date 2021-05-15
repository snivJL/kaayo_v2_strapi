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
  Text,
  Image,
  StackDivider,
  useToast,
  Button,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { formatPrice } from "../../lib/utils";
import { AddIcon } from "@chakra-ui/icons";
import { addToCart } from "../../store/order/orderSlice";
import { useDispatch } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const WishlistPopover = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const toast = useToast();
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
                <>
                  <TransitionGroup>
                    {wishlist.map((product) => (
                      <CSSTransition
                        key={product.id}
                        timeout={500}
                        classNames="item"
                      >
                        <Flex
                          align="center"
                          key={product.id}
                          justify="space-between"
                          mb={2}
                          py={2}
                        >
                          <Image
                            src={product.images[0].name}
                            alt="Picture of the product"
                            borderRadius="base"
                            w="50px"
                            h="70px"
                          />
                          <Text w="35%">{product.name}</Text>

                          <Text fontSize="sm">
                            &#8363;{formatPrice(product.price)}
                          </Text>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            as={Button}
                            onClick={() => {
                              dispatch(addToCart({ product, qty: 1 }));
                              toast({
                                title: `${product.name} has been added to your cart`,
                                status: "success",
                              });
                            }}
                            aria-label="Add item to cart"
                            icon={<AddIcon />}
                          />
                        </Flex>
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                </>
              ) : (
                <Text>No items in wishlist</Text>
              )}
            </Box>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default WishlistPopover;
