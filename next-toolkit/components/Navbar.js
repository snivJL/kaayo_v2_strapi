import { Link as NextLink } from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Text,
  Stack,
  Grid,
  GridItem,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";
import "./Navbar.module.css";
import CartPopover from "./checkout/CartPopover";
import WishlistPopover from "./product/WishlistPopover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-solid-svg-icons";
import { getTotalCartItems } from "../lib/utils";
import Searchbar from "./Searchbar";

const Links = ["/shop", "/ingredients", "/story"];

const NavLink = ({ children }) => (
  <Text casing="uppercase">
    <Link as={NextLink} href={children}>
      {children.replace("/", "")}
    </Link>
  </Text>
);

const AuthLinks = () => {
  const dispatch = useDispatch();
  return (
    <>
      <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
      <MenuItem>Link 2</MenuItem>
      <MenuDivider />
      <MenuItem>Link 3</MenuItem>
    </>
  );
};
const GuestLinks = () => {
  const router = useRouter();
  return (
    <>
      <MenuItem onClick={() => router.push("/login")}>Login</MenuItem>
      <MenuItem>Link 2</MenuItem>
      <MenuDivider />
      <MenuItem>Link 3</MenuItem>
    </>
  );
};

export default function Navbar() {
  const cart = useSelector((state) => state.order.cart);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  return (
    <>
      <Box
        shadow="base"
        bg="bg.100"
        px={4}
        pb={1}
        style={{
          position: "-webkit-sticky" /* Safari */,
          position: "sticky",
          top: 0,
          zIndex: 500,
        }}
      >
        <Grid h={24} templateColumns="repeat(6,1fr)">
          <IconButton
            size={"md"}
            my="auto"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: !isOpen ? "none" : "inherit" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <GridItem colSpan={{ base: 3, md: 1 }}>
            <Flex align="center" justify="center" h="100%">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={130}
                height={100}
              />
              <Heading as="h1" fontSize="xl">
                KA.A.YO
              </Heading>
            </Flex>
          </GridItem>
          <GridItem colSpan={4}>
            <Flex
              h="100%"
              justify="space-around"
              align="center"
              px={28}
              display={{ base: "none", md: "flex" }}
            >
              <Text casing="uppercase">
                <Link as={NextLink} href="/">
                  Home
                </Link>
              </Text>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
              <Searchbar />
            </Flex>
          </GridItem>
          <GridItem colSpan={1} rowStart={1} colStart={6}>
            <Flex h="100%" align="center" justify="center">
              {/* <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon />}
              >
                Action
              </Button> */}
              <Spacer />
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                >
                  <FontAwesomeIcon icon={faUser} />
                </MenuButton>
                <MenuList>{isAuth ? <AuthLinks /> : <GuestLinks />}</MenuList>
              </Menu>
              <Box position="relative" mr={2}>
                <CartPopover />
                <Text
                  fontSize="xs"
                  w={5}
                  h={5}
                  align="center"
                  border="1px"
                  borderRadius="9999px"
                  bg="primary.500"
                  color="white"
                  position="absolute"
                  top={-1}
                  right={-1}
                >
                  {getTotalCartItems(cart)}
                </Text>
              </Box>
              <Box position="relative" mr={2}>
                <WishlistPopover />
                <Text
                  fontSize="xs"
                  w={5}
                  h={5}
                  align="center"
                  border="1px"
                  borderRadius="9999px"
                  bg="red.500"
                  color="white"
                  position="absolute"
                  top={-1}
                  right={-1}
                >
                  {wishlist.length}
                </Text>
              </Box>
            </Flex>
          </GridItem>
        </Grid>

        {isOpen ? (
          <Box pb={4}>
            <Stack as={"nav"} h="100%" spacing={4}>
              <Text mr={4} casing="uppercase">
                <Link as={NextLink} href="/">
                  Home
                </Link>
              </Text>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
