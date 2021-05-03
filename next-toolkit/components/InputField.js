import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  MenuItem,
} from "@chakra-ui/react";
import { useField } from "formik";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={!!meta.error && meta.touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
