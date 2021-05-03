import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { Formik, Form } from "formik";
import { Button, Box } from "@chakra-ui/react";
import { register } from "../store/auth/authSlice";
import { useDispatch } from "react-redux";
import { registerSchema } from "../lib/yupSchemas";

const Register = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          dispatch(register(values));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button mt={4} isLoading={isSubmitting} type="submit">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
