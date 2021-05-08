import { Link as NextLink } from "next/link";
import {
  Box,
  Flex,
  Avatar,
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
import { useDispatch } from "react-redux";
import { logout } from "../store/auth/authSlice";
import "./Navbar.module.css";
import CartPopover from "./checkout/CartPopover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Links = ["/", "/shop", "/login", "/ingredients", "/story"];

const NavLink = ({ children }) => (
  <Text mr={4} casing="uppercase">
    <Link as={NextLink} href={children}>
      {children.replace("/", "")}
    </Link>
  </Text>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  return (
    <>
      <Box
        bg="bg.100"
        px={4}
        style={{
          position: "-webkit-sticky" /* Safari */,
          position: "sticky",
          top: 0,
          zIndex: 500,
        }}
      >
        <Grid h={16} templateColumns="repeat(5,1fr)">
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: !isOpen ? "none" : "inherit" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <GridItem colSpan={{ base: 3, md: 1 }}>
            <Flex align="center" justify="center" h="100%">
              Logo
            </Flex>
          </GridItem>
          <GridItem colSpan={3}>
            <Flex
              h="100%"
              justify="center"
              align="center"
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink mr={2} key={link}>
                  {link}
                </NavLink>
              ))}
            </Flex>
          </GridItem>
          <GridItem colSpan={1} rowStart={1} colStart={5}>
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
                <MenuList>
                  <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem>
                </MenuList>
              </Menu>
              <CartPopover />
            </Flex>
          </GridItem>
        </Grid>

        {isOpen ? (
          <Box pb={4}>
            <Stack as={"nav"} h="100%" spacing={4}>
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
