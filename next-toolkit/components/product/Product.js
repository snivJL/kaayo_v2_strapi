import {
  Box,
  Text,
  Button,
  VStack,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../../lib/media";
import Rating from "../../components/product/Rating";
import { getAverageRating, formatPrice } from "../../lib/utils";
import { addToCart } from "../../store/order/orderSlice";
import { useDispatch } from "react-redux";
import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@chakra-ui/react";

const Product = ({ product }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      maxW="250px"
      mx="auto"
      // bg="white"
    >
      <Box className="product-card" pos="relative">
        <Link href={`/products/${product.id}`}>
          <Image
            src={getStrapiMedia(product.images[0])}
            width={300}
            height={350}
          />
        </Link>

        <Box className="product-card-hidden" pos="absolute">
          <Image
            src={getStrapiMedia(product.images[1])}
            width={300}
            height={350}
          />
        </Box>
        <Box
          className="product-card-actions"
          mb="6px"
          color="white"
          pos="absolute"
        >
          <Grid
            templateColumns="repeat(5,1fr)"
            align="center"
            justify="center"
            gap={0}
            bg="primary.500"
          >
            <GridItem
              transition="all 0.3s"
              colSpan={1}
              h="100%"
              _hover={{ background: "primary.900" }}
            >
              <FontAwesomeIcon
                style={{ height: "100%" }}
                icon={faHeart}
              ></FontAwesomeIcon>
            </GridItem>

            {/* <Box h="100%" p={2} my={0}></Box> */}
            <GridItem
              colSpan={3}
              h="100%"
              transition="all 0.3s"
              borderRight="1px"
              borderLeft="1px"
              borderColor="primary.100"
              _hover={{ background: "primary.900" }}
            >
              <Button
                w="70%"
                style={{ borderRadius: 0 }}
                _hover={{ background: "primary.900" }}
                _active={{
                  transform: "scale(0.96)",
                }}
                _focus={{
                  outline: "none",
                }}
                onClick={() => {
                  let qty = 1;
                  dispatch(addToCart({ product, qty }));
                  toast({
                    title: `${product.name} added to cart!`,
                    // description: "We've created your account for you.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }}
              >
                Buy Now
              </Button>
            </GridItem>
            <GridItem
              transition="all 0.3s"
              colSpan={1}
              h="100%"
              _hover={{ background: "primary.900" }}
            >
              <Link href={`/products/${product.id}`}>
                <FontAwesomeIcon
                  style={{ height: "100%" }}
                  icon={faEye}
                ></FontAwesomeIcon>
              </Link>
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <VStack letterSpacing={1.3} spacing={1} mt={1} align="center">
        <Text fontSize="xl" color="gray.700" size="md">
          {product.name}
        </Text>
        <Rating
          value={getAverageRating(product)}
          numReviews={product.reviews.length}
          size="sm"
        />
        <Text letterSpacing={1}>
          &#8363;
          {formatPrice(product.price)}
        </Text>
        {/* <Button onClick={() => dispatch(addToCart(product))}>
          Add to cart
        </Button> */}
      </VStack>
    </Box>
  );
};

export default Product;
