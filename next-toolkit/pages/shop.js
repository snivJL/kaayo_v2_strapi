import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Product from "../components/product/Product";
import { Grid, Flex, Spinner, Text } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import HeroBreadcrumb from "../components/HeroBreadcrumb";
import ShopPanel from "../components/product/ShopPanel";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../components/Pagination";
import {
  setTotalProducts,
  fetchProducts,
  searchProducts,
} from "../store/product/productSlice";

const Shop = ({ productList, totalProducts }) => {
  // console.log(productList, totalProducts);
  const router = useRouter();

  let searchTerm = router.query.search;
  let filter = router.query.cat ? router.query.cat : null;
  let sort = router.query._sort ? router.query._sort : null;
  let page = router.query.page;

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { products, status, csr } = product;

  useEffect(() => {
    if (searchTerm) dispatch(searchProducts(searchTerm));
  }, [searchTerm]);
  useEffect(() => {
    // if (router.query)
    dispatch(fetchProducts({ cat: router.query.cat, sort, page }));
  }, [filter, sort, page, router.query.cat]);
  // router.query.cat dependency to fetch if filter is set to "All", route "/shop"

  useEffect(() => {
    dispatch(setTotalProducts(totalProducts));
  }, []);
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
          <>
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
          </>
        )}
        {(!csr || (csr && products.length > 0)) && <Pagination />}
      </Wrapper>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.STRAPI_URL}/products?_limit=8`);
  const data = await res.json();
  return {
    props: {
      productList: data.products,
      totalProducts: data.totalProducts,
    },
  };
};
export default Shop;
