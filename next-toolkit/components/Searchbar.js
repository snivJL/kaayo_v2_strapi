import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Input, InputGroup, IconButton, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Formik, Form } from "formik";
import { searchTermSchema } from "../lib/yupSchemas";
import InputField from "./InputField";
import { searchProducts } from "../store/product/productSlice";

const Searchbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ searchTerm: "" }}
      validationSchema={searchTermSchema}
      onSubmit={(values, FormikBag) => {
        const { searchTerm } = values;
        FormikBag.resetForm();
        router.push(`/shop?search=${searchTerm}`);
      }}
    >
      {({}) => (
        <Form>
          <InputGroup justifySelf="end" w="150px">
            <InputField name="searchTerm" placeholder="Search" />
            <IconButton
              as={Button}
              aria-label="Search database"
              icon={<SearchIcon />}
            />
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};

export default Searchbar;
