import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/product/Product";
import { Grid, GridItem } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import HeroBreadcrumb from "../components/HeroBreadcrumb";

const Shop = ({ productList }) => {
  console.log(productList);
  return (
    <>
      <HeroBreadcrumb path="shop"></HeroBreadcrumb>{" "}
      <Wrapper variant="large">
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {productList.map((p) => (
            <Product key={p._id} product={p} />
          ))}
        </Grid>
      </Wrapper>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:1337/products");
  const data = await res.json();
  return {
    props: {
      productList: data,
    },
  };
};
export default Shop;
