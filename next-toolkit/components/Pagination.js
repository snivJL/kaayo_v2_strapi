import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
const Pagination = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { totalProducts, csr, totalResults, currentPage } = product;
  const pageCount = csr
    ? Math.ceil(totalResults / 8)
    : Math.ceil(totalProducts / 8);
  const handlePageClick = ({ selected: page }) => {
    router.replace({
      query: { ...router.query, page: page + 1 },
    });
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
      activeClassName={"active"}
      forcePage={0}
    />
  );
};

export default Pagination;
