import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import ReviewInput from "./ReviewInput";
import ReviewList from "./ReviewList";

const ReviewSection = ({ product }) => {
  return (
    <SimpleGrid p={4} columns={{ sm: 1, md: 2 }} gap={14}>
      <ReviewList reviews={product.reviews} productId={product._id} />
      <ReviewInput productId={product._id} />
    </SimpleGrid>
  );
};

export default ReviewSection;
