import React from "react";
import { Formik, Form } from "formik";
import { emailSchema } from "../../lib/yupSchemas";
import { Button, Text } from "@chakra-ui/react";
import InputField from "../InputField";
import { addEmail } from "../../store/order/orderSlice";
import { useDispatch } from "react-redux";

const EmailForm = ({ handleStep }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={emailSchema}
      onSubmit={(values) => {
        dispatch(addEmail(values));
        handleStep(2);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Text fontSize="xs">
            You'll receive receipts and notifications at this email address.
            Already have an account? Sign in
          </Text>
          <InputField name="email" placeholder="email" type="email" />
          <Button mt={4} isLoading={isSubmitting} type="submit">
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
