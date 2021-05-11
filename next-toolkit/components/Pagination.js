import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { fetchProducts } from "../store/product/productSlice";
const Pagination = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { totalProducts, csr, products } = product;
  const handlePageClick = (page) => {
    const limit = 10;
    const start = page.selected === 0 ? page.selected : page.selected * limit;
    dispatch(fetchProducts({ start, limit }));
  };

  return (
    <ReactPaginate
      previousLabel={<FontAwesomeIcon color="white" icon={faChevronLeft} />}
      nextLabel={<FontAwesomeIcon color="white" icon={faChevronRight} />}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={Math.ceil(totalProducts / 10)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={(page) => handlePageClick(page)}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
