import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";

const TextareaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={!!meta.error && meta.touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Textarea
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextareaField;
