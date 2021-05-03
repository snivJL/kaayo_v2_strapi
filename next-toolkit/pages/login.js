import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { Formik, Form } from "formik";
import { Button, Box } from "@chakra-ui/react";
import { login } from "../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loginSchema } from "../lib/yupSchemas";

const Login = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ password: "", identifier: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          return dispatch(login(values));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="identifier"
              placeholder="email"
              label="Email"
              type="email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button mt={4} isLoading={isSubmitting} type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
