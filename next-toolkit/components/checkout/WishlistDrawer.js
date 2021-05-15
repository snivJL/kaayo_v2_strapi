import React from "react";
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
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../components/Wrapper";
import CardCarousel from "../product/CardCarousel";

const WishlistDrawer = () => {
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
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Text align="center">My wishlist</Text>
          </DrawerHeader>
          <DrawerBody>
            <Wrapper variant="regular" bg="white">
              <CardCarousel data={wishlist} />
            </Wrapper>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default WishlistDrawer;
