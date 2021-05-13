import React, { useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSort } from "../../store/product/productSlice";
import { useRouter } from "next/router";

const SortBar = () => {
  const [sortTitle, setSortTitle] = useState("Latest");
  const status = useSelector((state) => state.product.status);
  const router = useRouter();
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
            router.replace({
              query: { ...router.query, _sort: "price:asc" },
            });
          }}
        >
          Price Asc
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setSortTitle("Price Desc");
            router.replace({
              query: { ...router.query, _sort: "price:desc" },
            });
          }}
        >
          Price Desc
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setSortTitle("Latest");
            router.replace({
              query: { ...router.query, _sort: "createdAt:desc" },
            });
          }}
        >
          Latest
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setSortTitle("Oldest");
            router.replace({
              query: { ...router.query, _sort: "createdAt:asc" },
            });
          }}
        >
          Oldest
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setSortTitle("Ratings");
            router.replace({
              query: { ...router.query, _sort: "rating:desc" },
            });
          }}
        >
          Ratings
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortBar;
