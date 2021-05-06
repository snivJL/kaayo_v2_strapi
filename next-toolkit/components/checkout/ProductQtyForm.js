import React, { useState } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../../store/order/orderSlice";

const ProductQtyForm = ({ item, index, width = "100%" }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.order.cart);
  const [qty, setQty] = useState(cart);
  const handleChange = (index, value) => {
    const newArray = [...qty];
    newArray[index] = { ...newArray[index], qty: value };
    setQty(newArray);
    dispatch(updateCart(newArray));
  };
  return (
    <NumberInput
      w={width}
      mr={4}
      size="sm"
      max={item.product.countInStock}
      min={1}
      value={qty[index].qty}
      onChange={(e) => handleChange(index, e)}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper children="+" />
        <NumberDecrementStepper children="-" />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default ProductQtyForm;
