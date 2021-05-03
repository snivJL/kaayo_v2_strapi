import React, { useState } from "react";
import InputField from "../InputField";
import TextareaField from "../TextareaField";
import { Formik, Form } from "formik";
import { Button, Flex, Text, Heading, HStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { reviewSchema } from "../../lib/yupSchemas";
import RatingInput from "./RatingInput";
import { toast } from "react-toastify";
import { postReview } from "../../store/review/reviewSlice";

const ReviewInput = ({ productId }) => {
  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();
  const handleRating = (value) => setRating(value);
  return (
    <Formik
      initialValues={{ name: "", email: "", rating: null, comment: "" }}
      validationSchema={reviewSchema}
      onSubmit={(values) => {
        values.rating = rating;
        values.product = productId;
        return !rating
          ? toast.error("Enter a rating")
          : dispatch(postReview(values));
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex direction="column" justify="center">
            <Heading fontWeight="bold" align="left" size="md" mb={2}>
              Add a Review
            </Heading>
            <HStack mb={4} spacing={4}>
              <Text> Your rating:</Text>
              <RatingInput handleRating={handleRating} rating={rating} />
            </HStack>
            <HStack mb={4} spacing={2}>
              <InputField name="name" placeholder="Name" type="text" />
              <InputField name="email" placeholder="Email" type="email" />
            </HStack>
            <TextareaField name="comment" placeholder="Your comment" />
            <Button mt={4} isLoading={isSubmitting} type="submit">
              Submit
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewInput;
