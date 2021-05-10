import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../store/order/orderSlice";
import { Button } from "@chakra-ui/react";

const ReviewOrder = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const { status } = order;
  return (
    <Button
      variant="main"
      w="100%"
      onClick={() => dispatch(createOrder(order))}
      isLoading={status === "loading"}
    >
      buy
    </Button>
  );
};

export default ReviewOrder;
