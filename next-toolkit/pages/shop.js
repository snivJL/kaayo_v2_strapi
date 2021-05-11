import React, { useEffect } from "react";
import Product from "../components/product/Product";
import { Grid, Flex, Spinner, Text } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import HeroBreadcrumb from "../components/HeroBreadcrumb";
import ShopPanel from "../components/product/ShopPanel";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../components/Pagination";
import { countProducts } from "../store/product/productSlice";

const Shop = ({ productList }) => {
  console.log(productList);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { products, status, csr, filterBy, sortBy } = product;
  useEffect(() => {
    dispatch(countProducts());
  }, [filterBy, sortBy.cat, sortBy.type]);
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
            {csr ? (
              products.length > 0 ? (
                products.map((p) => <Product key={p._id} product={p} />)
              ) : (
                <Text>No results found</Text>
              )
            ) : (
              productList.map((p) => <Product key={p._id} product={p} />)
            )}
          </Grid>
        )}
        <Pagination />
      </Wrapper>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:1337/products?_limit=10");
  const data = await res.json();
  return {
    props: {
      productList: data,
    },
  };
};
export default Shop;
