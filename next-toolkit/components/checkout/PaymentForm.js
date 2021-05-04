import React, { useState } from "react";
import {
  Button,
  Input,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Flex,
  TabPanel,
} from "@chakra-ui/react";
import { addPaymentMethod } from "../../store/order/orderSlice";
import { useDispatch } from "react-redux";
import Coupon from "./Coupon";

const PaymentForm = ({ handleStep }) => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  console.log(paymentMethod);
  const dispatch = useDispatch();
  return (
    <>
      <Tabs p={4} isFitted variant="soft-rounded">
        <TabList mb="1em">
          <Tab onClick={() => setPaymentMethod("COD")}>Cash</Tab>
          <Tab onClick={() => setPaymentMethod("paypal")}>Paypal</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Coupon />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button
        mt={4}
        onClick={() => {
          handleStep(4);
          dispatch(addPaymentMethod(paymentMethod));
        }}
        type="submit"
      >
        Continue
      </Button>
    </>
  );
};

export default PaymentForm;
