import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../store/order/orderSlice";
const ReviewOrder = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  return <button onClick={() => dispatch(createOrder(order))}>buy</button>;
};

export default ReviewOrder;
