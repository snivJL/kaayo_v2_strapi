import React from "react";
import Product from "../components/product/Product";
import { Grid, Flex, Spinner } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import HeroBreadcrumb from "../components/HeroBreadcrumb";
import ShopPanel from "../components/product/ShopPanel";
import { useSelector } from "react-redux";

const Shop = ({ productList }) => {
  console.log(productList);
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);
  return (
    <>
      <HeroBreadcrumb path="shop"></HeroBreadcrumb>{" "}
      <Wrapper variant="large">
        <ShopPanel />
        {status === "loading" ? (
          <Flex justify="center" align="center" h="40vh">
            <Spinner size="lg" color="primary.500" />
          </Flex>
        ) : (
          <Grid
            mx="auto"
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={6}
          >
            {products
              ? products.map((p) => <Product key={p._id} product={p} />)
              : productList.map((p) => <Product key={p._id} product={p} />)}
          </Grid>
        )}
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
