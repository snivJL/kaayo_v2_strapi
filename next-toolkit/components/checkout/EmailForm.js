import React, { useState } from "react";
import { Formik, Form } from "formik";
import { emailSchema } from "../../lib/yupSchemas";
import { Button, Text, Collapse, Box } from "@chakra-ui/react";
import InputField from "../InputField";
import { addEmail } from "../../store/order/orderSlice";
import { login } from "../../store/auth/authSlice";

import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "../../lib/yupSchemas";

const EmailForm = ({ handleStep }) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.order.email);
  const [show, setShow] = useState(false);
  return (
    <>
      <Text fontSize="xs">
        You'll receive receipts and notifications at this egit statusil address.
        Already have an account?
        <Button fontSize="xs" variant="link" onClick={() => setShow(!show)}>
          {show ? "Continue as a guest" : "Sign in"}
        </Button>
      </Text>
      <Collapse in={!show}>
        <Formik
          initialValues={{ email }}
          validationSchema={emailSchema}
          onSubmit={(values) => {
            dispatch(addEmail(values));
            handleStep(2);
          }}
        >
          {({}) => (
            <Form key="1">
              <InputField name="email" placeholder="email" type="email" />
              <Button mt={4} type="submit">
                Continue
              </Button>
            </Form>
          )}
        </Formik>
      </Collapse>
      <Collapse in={show}>
        <Formik
          initialValues={{ password: "", identifier: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            console.log(values);
            dispatch(login(values));
            handleStep(2);
          }}
        >
          {({ isSubmitting }) => (
            <Form key="2">
              <InputField name="identifier" placeholder="email" type="email" />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  type="password"
                />
              </Box>
              <Button mt={4} isLoading={isSubmitting} type="submit">
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </Collapse>
    </>
  );
};

export default EmailForm;
