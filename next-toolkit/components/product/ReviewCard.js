import React from "react";
import { Flex, Text, Box, HStack, Heading } from "@chakra-ui/react";
import Rating from "./Rating";
import Moment from "react-moment";

const ReviewCard = ({ review }) => {
  return (
    <Flex mb={4} justify="center" direction="column" p={2} boxShadow="base">
      <HStack align="center" spacing={4} mb={4}>
        <Heading fontSize="lg">{review.name}</Heading>
        <Rating reviewRating={review.rating} size="xs"></Rating>
      </HStack>
      <Text mb={4} align="left">
        {review.comment}
      </Text>
      <Text mb={4} fontSize="sm" color="gray.400" align="left">
        Created on <Moment format="YYYY-MM-DD">{review.published_at}</Moment>
      </Text>
    </Flex>
  );
};

export default ReviewCard;
