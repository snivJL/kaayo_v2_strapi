import React from "react";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { filterByCategories } from "../../store/product/productSlice";

const FilterBar = () => {
  const dispatch = useDispatch();
  return (
    <Flex pb={8}>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Categories
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => dispatch(filterByCategories("charcoal"))}>
            Charcoal Soap
          </MenuItem>
          <MenuItem>Spice Soap</MenuItem>
          <MenuDivider />
          <MenuItem>Body Butter</MenuItem>
          <MenuItem>Lip Balm</MenuItem>
          <MenuItem>Shampoo Bar</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default FilterBar;
