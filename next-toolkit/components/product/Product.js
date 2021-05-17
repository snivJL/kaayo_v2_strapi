import { Box, Text, Button, VStack, Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../../lib/media";
import Rating from "../../components/product/Rating";
import { formatPrice } from "../../lib/utils";
import { addToCart } from "../../store/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@chakra-ui/react";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/wishlist/wishlistSlice";
const ImageRef = React.forwardRef(({ onClick, href, imageUrl }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <Image src={imageUrl} width={300} height={350} />
    </a>
  );
});
const Product = ({ product, maxW = "250px" }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const inWishlist = wishlist.find((p) => p.id === product.id);
  return (
    <Box borderWidth="1px" borderRadius="md" maxW={maxW} mx="auto" pb={2}>
      <Box className="product-card" pos="relative">
        <Image
          width={300}
          height={350}
          quality={30}
          src={product.images[0].name}
        ></Image>
        <Box className="product-card-hidden" pos="absolute">
          <Link href={`/products/${product.id}`} passHref>
            <ImageRef imageUrl={product.images[1].name} />
          </Link>
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
            {inWishlist ? (
              <GridItem
                onClick={() => dispatch(removeFromWishlist(product))}
                transition="all 0.3s"
                colSpan={1}
                h="100%"
                _hover={{ background: "primary.900" }}
              >
                <FontAwesomeIcon
                  style={{ height: "100%" }}
                  icon={faHeart}
                  color="red"
                ></FontAwesomeIcon>
              </GridItem>
            ) : (
              <GridItem
                onClick={() => dispatch(addToWishlist(product))}
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
            )}

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
                variant="main"
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
          product={product}
          numReviews={product.reviews.length}
          size="sm"
        />
        <Text letterSpacing={1}>
          &#8363;
          {formatPrice(product.price)}
        </Text>
      </VStack>
    </Box>
  );
};

export default Product;
