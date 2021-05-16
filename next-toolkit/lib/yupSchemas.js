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

export const emailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export const shippingSchema = Yup.object().shape({
  fullname: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  district: Yup.string(),
  ward: Yup.string(),
});

export const searchTermSchema = Yup.object().shape({
  searchTerm: Yup.string().required(""),
});

export const couponSchema = Yup.object().shape({
  coupon: Yup.string()
    .matches(/^[A-Z]*$/, "Coupon code must be in uppercase")
    .required("Please enter your coupon code"),
});
// .matches(/^[A-Z]*$/, "Coupon code must be in uppercase")
