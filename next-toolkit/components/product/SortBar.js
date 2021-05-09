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
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
        <MenuItem
          onClick={(e) => {
            setSortTitle("Latest");
            dispatch(setSort({ cat: "createdAt", type: "desc" }));
          }}
        >
          Latest
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setSortTitle("Oldest");
            dispatch(setSort({ cat: "createdAt", type: "asc" }));
          }}
        >
          Oldest
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setSortTitle("Ratings");
            dispatch(setSort({ cat: "price", type: "desc" }));
          }}
        >
          Ratings
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortBar;
