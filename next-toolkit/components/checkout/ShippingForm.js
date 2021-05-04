import React from "react";
import { Formik, Form } from "formik";
import { shippingSchema } from "../../lib/yupSchemas";
import { Button, Text, Flex } from "@chakra-ui/react";
import InputField from "../InputField";
import { addShipping } from "../../store/order/orderSlice";
import { useDispatch } from "react-redux";

const ShippingForm = ({ handleStep }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ ward: "", district: "" }}
      validationSchema={shippingSchema}
      onSubmit={(values) => {
        dispatch(addShipping(values));
        handleStep(3);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex>
            <InputField name="fullname" placeholder="Full name" type="text" />
            <InputField name="phone" placeholder="Phone number" type="text" />
          </Flex>
          <InputField name="address" placeholder="Address" type="text" />
          <Flex>
            <InputField name="city" placeholder="City" type="text" />
            <InputField name="district" placeholder="District" type="text" />
            <InputField name="ward" placeholder="Ward" type="text" />
          </Flex>
          <Button mt={4} isLoading={isSubmitting} type="submit">
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ShippingForm;
