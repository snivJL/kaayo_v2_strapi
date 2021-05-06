import React, { useState } from "react";
import api from "../api";
import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Collapse,
} from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import EmailForm from "../components/checkout/EmailForm";
import ShippingForm from "../components/checkout/ShippingForm";
import Paymentform from "../components/checkout/Paymentform";
import ReviewOrder from "../components/checkout/ReviewOrder";
import OrderSummary from "../components/checkout/OrderSummary";
import { useSelector } from "react-redux";

const checkout = ({ user }) => {
  const [step, setStep] = useState(1);
  const handleStep = (value) => setStep(value);
  const email = useSelector((state) => state.order.email);
  const order = useSelector((state) => state.order);
  const {
    phone,
    fullname,
    address,
    city,
    district,
    ward,
    paymentMethod,
  } = order;
  return (
    <Wrapper variant="regular">
      <SimpleGrid mx="auto" columns={[1, null, 2]} spacing="100px">
        <SimpleGrid p={4} className="checkout-grid" rows={4} spacing="50px">
          <Box>
            <Heading as="h2" fontSize="lg">
              Your email
            </Heading>
            {email && <Text>{email}</Text>}
            <Collapse in={step === 1} animateOpacity>
              <EmailForm user={user} handleStep={handleStep} />
            </Collapse>
          </Box>
          <Box>
            <Heading as="h2" mb={2} fontSize="lg">
              Shipping
            </Heading>
            {order.phone && (
              <>
                <Text>{phone}</Text>
                <Text>{fullname}</Text>
                <Text>{address}</Text>
                <Text>{city}</Text>
                <Text>{district}</Text>
                <Text>{ward}</Text>
              </>
            )}

            <Collapse in={step === 2} animateOpacity>
              <ShippingForm handleStep={handleStep} />
            </Collapse>
          </Box>
          <Box>
            <Heading as="h2" fontSize="lg">
              Payment & Discounts
            </Heading>
            {email && <Text>{paymentMethod}</Text>}
            <Collapse in={step === 3} animateOpacity>
              <Paymentform handleStep={handleStep} />
            </Collapse>
          </Box>
          <Box>
            <Heading as="h2" fontSize="lg">
              Review & Purchase
            </Heading>
            <Collapse in={step === 4} animateOpacity>
              <ReviewOrder />
            </Collapse>
          </Box>
        </SimpleGrid>
        <OrderSummary />
      </SimpleGrid>
    </Wrapper>
  );
};

// export const getStaticProps = async () => {
//   try {
//     const res = await api.get("http://localhost:1337/users/me");
//     const data = await res.json();
//     return {
//       props: {
//         user: data,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         user: error,
//       },
//     };
//   }
// };
export default checkout;
