import React from "react";
import Product from "../components/product/Product";
import { Grid, GridItem } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import HeroBreadcrumb from "../components/HeroBreadcrumb";
import FilterBar from "../components/product/FilterBar";
import { useSelector } from "react-redux";

const Shop = ({ productList }) => {
  console.log(productList);
  const filteredProducts = useSelector(
    (state) => state.product.filteredProducts
  );
  return (
    <>
      <HeroBreadcrumb path="shop"></HeroBreadcrumb>{" "}
      <Wrapper variant="large">
        <FilterBar />
        <Grid
          mx="auto"
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={6}
        >
          {filteredProducts
            ? filteredProducts.map((p) => <Product key={p._id} product={p} />)
            : productList.map((p) => <Product key={p._id} product={p} />)}
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
