import React, { useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSort } from "../../store/product/productSlice";

const SortBar = () => {
  const [sortTitle, setSortTitle] = useState("Latest");
  const status = useSelector((state) => state.product.status);
  const dispatch = useDispatch();
  return (
    <Menu>
      <MenuButton
        isLoading={status === "loading"}
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {sortTitle}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={(e) => {
            setSortTitle("Price Asc");
            dispatch(setSort({ cat: "price", type: "asc" }));
          }}
        >
          Price Asc
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setSortTitle("Price Desc");
            dispatch(setSort({ cat: "price", type: "desc" }));
          }}
        >
          Price Desc
        </MenuItem>
        {/* <MenuItem
      onClick={(e) => {
        setFilter("Charcoal Soap");
        dispatch(filterByCategories("charcoal"));
      }}
    >
      Charcoal Soap
    </MenuItem>
    <MenuItem
      onClick={(e) => {
        console.log(e.target);
        setFilter("Spice Soap");
        dispatch(filterByCategories("spice"));
      }}
    >
      Spice Soap
    </MenuItem>
    <MenuDivider />
    <MenuItem
      onClick={(e) => {
        setFilter("Body Butter");
        filterByCategories("body");
      }}
    >
      Body Butter
    </MenuItem>
    <MenuItem
      onClick={(e) => {
        setFilter("Lip Balm");
        dispatch(filterByCategories("lip"));
      }}
    >
      Lip Balm
    </MenuItem>
    <MenuItem
      onClick={(e) => {
        setFilter("Shampoo Bar");
        dispatch(filterByCategories("shampoo"));
      }}
    >
      Shampoo Bar
    </MenuItem>
    <MenuItem>Attend a Workshop</MenuItem> */}
      </MenuList>
    </Menu>
  );
};

export default SortBar;
