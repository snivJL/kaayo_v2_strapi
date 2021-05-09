import React from "react";
import Rating from "../product/Rating";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
  Button,
  Flex,
  Grid,
  Image,
  Box,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { addToCart } from "../../store/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice, VND } from "../../lib/utils";
import Wrapper from "../../components/Wrapper";

const WishlistDrawer = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  return (
    <Flex justify="center" mb={2}>
      <Button colorScheme="green" onClick={onOpen}>
        Add from your wishlist
      </Button>
      <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Text align="center">My wishlist</Text>
          </DrawerHeader>
          <DrawerBody>
            <Wrapper variant="regular" bg="white">
              {" "}
              {wishlist.map((p) => (
                <Grid
                  templateColumns={{
                    base: "repeat(4, 1fr)",
                  }}
                  gap={6}
                  key={p.id}
                  my={2}
                  px={{ base: "2em", md: "4em", lg: "8em" }}
                >
                  <Image boxSize="120px" src={p.images[0].name} mr={10}></Image>
                  <Flex direction="column" justify="center">
                    <Text color="gray.700" fontSize="lg">
                      {p.name}
                    </Text>
                    <Text>
                      {VND()}
                      {formatPrice(p.price)}
                    </Text>
                    <Text>{p.categories[0].name}</Text>
                  </Flex>
                  <Box my="auto">
                    <Rating
                      my="auto"
                      product={p}
                      numReviews={p.reviews.length}
                    />
                  </Box>
                  <Button
                    onClick={() => {
                      dispatch(addToCart({ product: p, qty: 1 }));
                      toast({
                        title: `${p.name} added to cart!`,
                        status: "success",
                      });
                    }}
                    ml="auto"
                    my="auto"
                    variant="main"
                  >
                    <AddIcon w={6} h={6} />
                  </Button>
                </Grid>
              ))}
            </Wrapper>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default WishlistDrawer;
