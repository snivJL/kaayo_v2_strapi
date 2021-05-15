import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import FilterBar from "./FilterBar";
import SortBar from "./SortBar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const filters = [
  { name: "Charcoal Soap", active: false },
  { name: "Spice Soap", active: false },
  { name: "Baby Soap", active: false },
  { name: "Body Butter", active: false },
];

const ShopPanel = () => {
  const router = useRouter();
  const handleFilter = (e) => {
    filters.map((f) => (f.name === e.target.name ? (f.active = !f.active) : f));
    const route = filters
      .filter((f) => f.active)
      .reduce((acc, f) => acc + `cat=${f.name.replace(" ", "_")}&`, "")
      .slice(0, -1)
      .toLowerCase();

    router.push(`/shop?${route}`);
  };
  return (
    <>
      <Flex align="center" borderRadius="4px" bg="primary.500" mb={8}>
        <FilterBar />
      </Flex>
      <Flex align="center" borderRadius="4px" bg="primary.500" mb={8}>
        {filters.map((x, index) => (
          <Button
            key={index}
            // variant="ghost"
            name={x.name}
            color="white"
            bg={x.active ? "red" : ""}
            onClick={handleFilter}
          >
            {x.name}
          </Button>
        ))}

        <SortBar />
      </Flex>
    </>
  );
};

export default ShopPanel;
