import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";

const FilterBar = () => {
  const router = useRouter();
  const [filterTitle, setFilterTitle] = useState("All");
  const status = useSelector((state) => state.product.status);
  const dispatch = useDispatch();
  return (
    <Menu>
      <MenuButton borderRadius={0} as={Button} rightIcon={<ChevronDownIcon />}>
        {filterTitle}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            router.push("/shop");
            setFilterTitle("All");
          }}
        >
          All
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/shop?cat=charcoal_soap");
            setFilterTitle("Charcoal Soap");
          }}
        >
          Charcoal Soap
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/shop?cat=spice_soap");
            setFilterTitle("Spice Soap");
          }}
        >
          Spice Soap
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={() => {
            router.push("/shop?cat=body_butter");
            setFilterTitle("Body Butter");
          }}
        >
          Body Butter
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/shop?cat=lip_balm");
            setFilterTitle("Lip Balm");
          }}
        >
          Lip Balm
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/shop?cat=shampoo_bar");
            setFilterTitle("Shampoo Bar");
          }}
        >
          Shampoo Bar
        </MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FilterBar;
