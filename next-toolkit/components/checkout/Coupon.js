import React from "react";
import { Flex, Button, Input } from "@chakra-ui/react";

const Coupon = () => {
  return (
    <Flex align="center">
      <Input
        name="coupon"
        borderRightRadius="0"
        placeholder="Coupon Code"
        type="text"
      />
      <Button borderLeftRadius="0">Apply</Button>
    </Flex>
  );
};

export default Coupon;
