import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  Text,
  Image,
  Heading,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Td,
  Th,
  Spinner,
  Box,
} from "@chakra-ui/react";
import Wrapper from "../../../components/Wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { getSingleOrder } from "../../../store/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { VND, formatPrice, SHIPPING_PRICE } from "../../../lib/utils";
const confirmation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const orderId = router.query.id;
  const orderDetail = useSelector((state) => state.order.orderDetail);
  const status = useSelector((state) => state.order.status);
  const { email, cart, id, totalPrice } = orderDetail;
  useEffect(() => {
    dispatch(getSingleOrder(orderId));
  }, []);
  return (
    <Wrapper>
      {status === "loading" && !orderDetail ? (
        <Flex align="center" justify="center" style={{ minHeight: "60vh" }}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex direction="column" align="center">
          {console.log(totalPrice)}
          <FontAwesomeIcon icon={faCheckCircle} size="6x"></FontAwesomeIcon>
          <Heading pt={2} as="h1">
            Thank you for your order
          </Heading>
          <Text fontSize="sm">
            A confirmation email has been sent to {email}
          </Text>
          <Text fontSize="sm">Order # {id}</Text>
          <Image
            py={4}
            boxSize="200px"
            src="/images/delivery.svg"
            alt="delivery"
          ></Image>
          <Heading fontSize="lg" as="h4">
            Your goodness is on its way!
          </Heading>
          <Table
            bg="white"
            colorScheme="green"
            variant="simple"
            mt={14}
            size="md"
          >
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Product Name</Th>
                <Th> Unit Price</Th>
                <Th> Qty</Th>
                <Th> Subtotal</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <Image
                      src={item.image}
                      alt="Picture of the product"
                      width={100}
                      height={120}
                    />
                  </Td>
                  <Td>{item.name}</Td>
                  <Td>
                    &#8363;
                    {item.price}
                  </Td>
                  <Td>{item.qty}</Td>
                  <Td>
                    &#8363;
                    {item.price * item.qty}
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th></Th>
                <Th></Th>
                <Th>
                  <Text>
                    Subtotal: {VND()}
                    {formatPrice(totalPrice + "")}
                  </Text>
                  <Text>
                    Shipping: {VND()}
                    {formatPrice(SHIPPING_PRICE)}
                  </Text>
                  <Text fontWeight="bold">
                    Total: {VND()}
                    {formatPrice(totalPrice + SHIPPING_PRICE + "")}
                  </Text>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </Flex>
      )}
    </Wrapper>
  );
};

export default confirmation;
