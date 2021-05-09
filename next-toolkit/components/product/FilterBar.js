import React, { useState } from "react";
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
import { setFilter } from "../../store/product/productSlice";

const FilterBar = () => {
  const [filterTitle, setFilterTitle] = useState("All");
  const status = useSelector((state) => state.product.status);
  const dispatch = useDispatch();
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {filterTitle}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={(e) => {
            setFilterTitle("All");
            dispatch(setFilter(""));
          }}
        >
          All
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setFilterTitle("Charcoal Soap");
            dispatch(setFilter("charcoal"));
          }}
        >
          Charcoal Soap
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setFilterTitle("Spice Soap");
            dispatch(setFilter("spice"));
          }}
        >
          Spice Soap
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={(e) => {
            setFilterTitle("Body Butter");
            dispatch(setFilter("body"));
          }}
        >
          Body Butter
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setFilterTitle("Lip Balm");
            dispatch(setFilter("lip"));
          }}
        >
          Lip Balm
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setFilterTitle("Shampoo Bar");
            dispatch(setFilter("shampoo"));
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
