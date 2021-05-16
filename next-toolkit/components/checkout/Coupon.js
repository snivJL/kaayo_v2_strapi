import React, { useEffect } from "react";
import InputField from "../InputField";
import { Button, Box, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { couponSchema } from "../../lib/yupSchemas";
import { applyCoupon } from "../../store/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";

const Coupon = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.order.error);
  const appliedCoupon = useSelector((state) => state.order.appliedCoupon);
  if (error) toast({ title: error, status: "error" });
  return (
    <>
      {appliedCoupon ? (
        appliedCoupon.name
      ) : (
        <Formik
          initialValues={{ coupon: "" }}
          validationSchema={couponSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            dispatch(applyCoupon({ values }));
            return resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form key="2">
              <Box mt={4}>
                <InputField
                  name="coupon"
                  borderRightRadius="0"
                  placeholder="Coupon Code"
                  type="text"
                />
              </Box>
              <Button
                type="submit"
                isLoading={isSubmitting}
                borderLeftRadius="0"
              >
                Apply
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default Coupon;
