import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faIdBadge } from "@fortawesome/free-regular-svg-icons";
import { faMobileAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const checkout = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const handleStep = (value) => setStep(value);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const email = useSelector((state) => state.order.email);
  const user = useSelector((state) => state.auth.user);
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
  useEffect(() => {
    if (isAuth) {
      dispatch(setUser());
      setStep(2);
    }
  }, [isAuth]);
  return (
    <Box bg="green.100" mt={0} pt={8}>
      <Wrapper variant="regular" py={0}>
        <SimpleGrid
          bg="green.100"
          mx="auto"
          columns={[1, null, 2]}
          spacing="100px"
        >
          <SimpleGrid p={4} className="checkout-grid" rows={4} spacing="50px">
            <Box bg="white" p={4} border="green.200" position="relative">
              {step > 1 && (
                <Button
                  onClick={() => setStep(1)}
                  variant="link"
                  position="absolute"
                  top={4}
                  right={4}
                >
                  Edit
                </Button>
              )}
              <Heading as="h2" mb={4} fontSize="xl">
                1. Your email
              </Heading>
              {isAuth ? (
                <Text>{user.email}</Text>
              ) : (
                email && (
                  <>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <Text pl={2} as="span">
                      {email}
                    </Text>
                  </>
                )
              )}
              <Collapse in={step === 1} animateOpacity>
                <EmailForm handleStep={handleStep} />
              </Collapse>
            </Box>
            <Box bg="white" p={4} border="green.200" position="relative">
              {step > 2 && (
                <Button
                  onClick={() => setStep(2)}
                  variant="link"
                  position="absolute"
                  top={4}
                  right={4}
                >
                  Edit
                </Button>
              )}
              <Heading as="h2" mb={4} fontSize="xl">
                2. Shipping
              </Heading>
              {order.phone && (
                <>
                  <Box>
                    <FontAwesomeIcon icon={faMobileAlt} />
                    <Text as="span" pl={2}>
                      {phone}
                    </Text>
                  </Box>
                  <Box>
                    <FontAwesomeIcon icon={faIdBadge} />
                    <Text as="span" pl={2}>
                      {fullname}
                    </Text>
                  </Box>
                  <Box>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <Text as="span" pl={2}>
                      {address}
                    </Text>
                  </Box>

                  <Text as="span" pl={2}>
                    {city}
                  </Text>
                  <Text as="span" pl={2}>
                    {district}
                  </Text>
                  <Text as="span" pl={2}>
                    {ward}
                  </Text>
                </>
              )}

              <Collapse in={step === 2} animateOpacity>
                <ShippingForm handleStep={handleStep} />
              </Collapse>
            </Box>
            <Box bg="white" p={4} border="green.200" position="relative">
              {step > 3 && (
                <Button
                  onClick={() => setStep(3)}
                  variant="link"
                  position="absolute"
                  top={4}
                  right={4}
                >
                  Edit
                </Button>
              )}
              <Heading as="h2" mb={4} fontSize="xl">
                3. Payment & Discounts
              </Heading>
              {paymentMethod && <Text>{paymentMethod}</Text>}
              <Collapse in={step === 3} animateOpacity>
                <Paymentform handleStep={handleStep} />
              </Collapse>
            </Box>
            <Box bg="white" p={4} borderColor="green.200">
              <Heading as="h2" mb={4} fontSize="xl">
                4. Review & Purchase
              </Heading>
              <Collapse in={step === 4} animateOpacity>
                <ReviewOrder />
              </Collapse>
            </Box>
          </SimpleGrid>
          <OrderSummary />
        </SimpleGrid>
      </Wrapper>
    </Box>
  );
};

export default checkout;
