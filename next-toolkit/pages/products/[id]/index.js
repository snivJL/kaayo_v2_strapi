import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedProduct } from "../../../store/product/productSlice";
import HeroBreadcrumb from "../../../components/HeroBreadcrumb";
import {
  SimpleGrid,
  Box,
  VStack,
  Image,
  Stack,
  Text,
  Button,
  StackDivider,
  Flex,
  useToast,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import Wrapper from "../../../components/Wrapper";
import Rating from "../../../components/product/Rating";
import ProductTabs from "../../../components/product/ProductTabs";
import { addToCart } from "../../../store/order/orderSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../store/wishlist/wishlistSlice";
import { formatPrice } from "../../../lib/utils";
import WishlistIcon from "../../../components/icons/WishlistIcon";
import ProductCarousel from "../../../components/product/ProductCarousel";

// import api from "../../../api";

const product = ({ product }) => {
  const toast = useToast();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const inWishlist = wishlist.find((i) => i.id === product.id);
  const [qty, setQty] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const handleChange = (value) => {
    setQty(value);
    console.log(qty);
  };

  useEffect(() => {
    dispatch(getSelectedProduct(id));
  }, [dispatch, wishlist]);
  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta property="og:title" content="Product page detail" />
        <link
          rel="stylesheet"
          href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"
        />
      </Head>
      <HeroBreadcrumb
        path={`shop/${product.name}`}
        product={product}
      ></HeroBreadcrumb>
      <Wrapper lineHeights="tall" bg="gray.50">
        <SimpleGrid columns={{ sm: 1, md: 2 }} gap={14} px={4}>
          <Box mx={{ base: "auto", md: "0px" }}>
            {/* <Image
              src={product.images[0].name}
              alt="Picture of the product"
              width={500}
              height={600}
            /> */}
            <ProductCarousel images={product.images} />
          </Box>

          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            w="100%"
            align="stretch"
          >
            <Stack spacing={4}>
              <Heading as="h2" fontSize="3xl" textAlign={["center", "left"]}>
                {product.name}
              </Heading>
              <Box textAlign={["center", "left"]}>
                <Rating product={product} numReviews={product.reviews.length} />
              </Box>

              <Box>
                <Text>Description: {product.description}</Text>
              </Box>
            </Stack>
            <Stack spacing={6}>
              <Box>
                &#8363;
                <Text as="span" fontWeight="bold" fontSize="xl">
                  {formatPrice(product.price)}
                </Text>
              </Box>
              <Flex align="center">
                <Text mr={4}>
                  {product.countInStock > 0
                    ? product.countInStock > 5
                      ? "In Stock"
                      : `Only ${product.countInStock} left!`
                    : "Out Of Stock"}
                </Text>
                {/* <FormLabel>Amount</FormLabel> */}
                <NumberInput
                  mr={4}
                  size="sm"
                  max={product.countInStock}
                  min={1}
                  value={qty}
                  onChange={handleChange}
                >
                  <NumberInputField w="60px" />
                  <NumberInputStepper>
                    <NumberIncrementStepper children="+" />
                    <NumberDecrementStepper children="-" />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  w="80%"
                  onClick={() => dispatch(addToCart({ product, qty }))}
                  mr={4}
                  bg="primary.500"
                  color="white"
                  _hover={{
                    background: "primary.900",
                  }}
                  _active={{
                    transform: "scale(0.96)",
                  }}
                  _focus={{
                    outline: "none",
                  }}
                >
                  Buy Now
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    inWishlist
                      ? dispatch(removeFromWishlist(product))
                      : dispatch(addToWishlist(product));
                    inWishlist
                      ? toast({
                          title: `${product.name} removed from your wishlist!`,
                          status: "success",
                        })
                      : toast({
                          title: `${product.name} added to your wishlist!`,
                          status: "success",
                        });
                  }}
                >
                  <WishlistIcon inWishlist={inWishlist} />
                </Button>
              </Flex>

              <Box>
                Categories:
                {product.categories.map((cat) => (
                  <Text as="span" fontSize="lg" mx={1}>
                    {cat.name}
                  </Text>
                ))}
              </Box>
              <Box>
                Ingredients:
                {product.ingredients.map((ing) => (
                  <Text as="span" fontSize="lg" mx={1}>
                    {ing.name}
                  </Text>
                ))}
              </Box>
            </Stack>
          </VStack>
        </SimpleGrid>
        <Box py={8}>
          <ProductTabs product={product} />
        </Box>
      </Wrapper>
    </>
  );
};

export const getStaticProps = async (ctx) => {
  const res = await fetch(`http://localhost:1337/products/${ctx.params.id}`);
  const product = await res.json();
  return {
    props: {
      product,
    },
  };
};
export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:1337/products");
  const productList = await res.json();
  console.log(productList);
  const ids = productList.map((p) => p.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
export default product;
