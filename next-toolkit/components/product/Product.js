import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  StackDivider,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../../lib/media";
import Rating from "../../components/product/Rating";
import { getAverageRating, getNumReviews } from "../../lib/utils";
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
      className="product-card-wrapper"
      overflow="hidden"
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
          <HStack
            justify="center"
            bgGradient="linear(to-r, green.200, green.500)"
            bottom={0}
            divider={<StackDivider mx={0} borderColor="gray.200" />}
            align="center"
          >
            <Text
              w="15%"
              h="100%"
              size="md"
              ml={4}
              mr={-2}
              _hover={{ backgroundColor: "black" }}
            >
              <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
            </Text>
            <Button
              w="70%"
              mx={-2}
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
            <Text w="15%" ml={1} mr={0}>
              <Link href={`/products/${product.id}`}>
                <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
              </Link>
            </Text>
          </HStack>
        </Box>
      </Box>
      <VStack letterSpacing={1.5} spacing={1} mt={1} align="center">
        <Text size="md">{product.name}</Text>
        <Rating
          value={getAverageRating(product)}
          numReviews={getNumReviews(product)}
          size="sm"
        />
        <Text>
          &#8363;
          {product.price}
        </Text>
        {/* <Button onClick={() => dispatch(addToCart(product))}>
          Add to cart
        </Button> */}
      </VStack>
    </Box>
  );
};

export default Product;
