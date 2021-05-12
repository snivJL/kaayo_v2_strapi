import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { countProducts, fetchProducts } from "../store/product/productSlice";
const Pagination = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { totalProducts, csr, products } = product;
  const count = totalProducts;
  const pageCount = Math.ceil(count / 10);
  const handlePageClick = ({ selected: page }) => {
    const limit = 10;
    const start = page * limit;
    dispatch(fetchProducts({ start, limit }));
  };

  return (
    <ReactPaginate
      previousLabel={<FontAwesomeIcon color="white" icon={faChevronLeft} />}
      nextLabel={<FontAwesomeIcon color="white" icon={faChevronRight} />}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      // subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
