import React from "react";
import { useDispatch } from "react-redux";
import { Input, InputGroup, IconButton, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Formik, Form } from "formik";
import { searchTermSchema } from "../lib/yupSchemas";
import InputField from "./InputField";

const Searchbar = () => {
  return (
    <Formik
      initialValues={{ searchTerm: "" }}
      validationSchema={searchTermSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputGroup justifySelf="end" w="150px">
            <InputField name="searchTerm" placeholder="Search" />
            <IconButton
              as={Button}
              colorScheme="green"
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
