import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(6, "Password must contain at least 6 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must contain at least 6 characters")
    .required("Required"),
  identifier: Yup.string().email("Invalid email").required("Required"),
});

export const reviewSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a name"),
  comment: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter a valid email"),
});
