import React from "react";
import { useDispatch } from "react-redux";
import { Input, InputGroup, IconButton, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Formik, Form } from "formik";
import { searchTermSchema } from "../lib/yupSchemas";
import InputField from "./InputField";
import { searchProducts } from "../store/product/productSlice";

const Searchbar = () => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ searchTerm: "" }}
      validationSchema={searchTermSchema}
      onSubmit={(values) => {
        dispatch(searchProducts(values));
        return;
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
