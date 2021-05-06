import React, { useState } from "react";
import { Formik, Form } from "formik";
import { emailSchema } from "../../lib/yupSchemas";
import { Button, Text, Collapse, Box } from "@chakra-ui/react";
import InputField from "../InputField";
import { addEmail } from "../../store/order/orderSlice";
import { login } from "../../store/auth/authSlice";

import { useDispatch } from "react-redux";
import { loginSchema } from "../../lib/yupSchemas";

const EmailForm = ({ handleStep, user }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  console.log(user);
  return (
    <>
      <Text fontSize="xs">
        You'll receive receipts and notifications at this email address. Already
        have an account?
        <Button fontSize="xs" variant="link" onClick={() => setShow(!show)}>
          {show ? "Continue as a guest" : "Sign in"}
        </Button>
      </Text>
      <Collapse in={!show}>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={emailSchema}
          onSubmit={(values) => {
            dispatch(addEmail(values));
            handleStep(2);
          }}
        >
          {({ isSubmitting }) => (
            <Form key="1">
              <InputField name="email" placeholder="email" type="email" />
              <Button mt={4} isLoading={isSubmitting} type="submit">
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
