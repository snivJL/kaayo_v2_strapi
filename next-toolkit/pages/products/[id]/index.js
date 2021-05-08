import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getSelectedProduct } from "../../../store/product/productSlice";
import Image from "next/image";
import HeroBreadcrumb from "../../../components/HeroBreadcrumb";
import {
  SimpleGrid,
  Box,
  VStack,
  Stack,
  Text,
  Button,
  StackDivider,
  Flex,
  FormControl,
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
import { getAverageRating, formatPrice } from "../../../lib/utils";
// import api from "../../../api";

const product = ({ product }) => {
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
  }, [dispatch]);
  return (
    <>
      <HeroBreadcrumb
        path={`shop/${product.name}`}
        product={product}
      ></HeroBreadcrumb>
      <Wrapper lineHeights="tall" bg="gray.50">
        <SimpleGrid columns={{ sm: 1, md: 2 }} gap={14} px={2}>
          <Box>
            <Image
              src="/images/christopher.png"
              alt="Picture of the product"
              width={500}
              height={600}
            />
          </Box>

          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            w="100%"
            align="stretch"
          >
            <Stack spacing={4}>
              <Heading as="h2" fontSize="lg">
                {product.name}
              </Heading>
              <Box>
                &#8363;
                {formatPrice(product.price)}
              </Box>
              <Box>
                <Rating
                  value={getAverageRating(product)}
                  numReviews={product.reviews.length}
                />
              </Box>
              <Box>
                <Text>{product.description}</Text>
              </Box>
            </Stack>
            <Stack spacing={4}>
              <Flex align="center">
                {/* <FormLabel>Amount</FormLabel> */}
                <NumberInput
                  w="15%"
                  mr={4}
                  size="sm"
                  max={product.countInStock}
                  min={1}
                  value={qty}
                  onChange={handleChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper children="+" />
                    <NumberDecrementStepper children="-" />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  onClick={() => dispatch(addToCart({ product, qty }))}
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
              </Flex>

              <Box>Categories: {product.categories.map((cat) => cat.name)}</Box>
              <Box>
                Ingredients: {product.ingredients.map((ing) => ing.name)}
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
