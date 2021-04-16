// import React from "react";
// import ErrorPage from "next/error";
// import { useSelector, useDispatch } from "react-redux";
// import getProducts from "../../redux/features/product/productSlice";
// import { useRouter } from "next/router";

// export default function Shop({ products, preview }) {
//   const router = useRouter();
//   if (!router.isFallback && !post?.slug) {
//     return <ErrorPage statusCode={404} />;
//   }

//   return <div></div>;
// }

// export async function getStaticProps({ params, preview = null }) {
//   dispatch(getProducts());

//   return {
//     props: {
//       preview,
//       products: data?.products,
//     },
//   };
// }

// export async function getStaticPaths() {
//   return {
//     paths: "/shop",
//     fallback: false,
//   };
// }
