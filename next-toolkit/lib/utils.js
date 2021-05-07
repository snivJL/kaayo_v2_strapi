import { Text } from "@chakra-ui/react";
export const getAverageRating = (product) => {
  return (
    product.reviews.reduce((acc, r) => {
      return (acc += r.rating);
    }, 0) /
    (product.reviews.length - 1)
  );
};

export const getNumReviews = (product) => {
  return product.reviews.length - 1;
};

export const VND = (size = "sm") => (
  <Text as="span" fontSize={size}>
    ₫
  </Text>
);

export const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
