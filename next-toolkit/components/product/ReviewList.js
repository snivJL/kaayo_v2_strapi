import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { getProductReviews } from "../../store/review/reviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";

const ReviewList = ({ productId }) => {
  const dispatch = useDispatch();
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(5);
  const reviews = useSelector((state) => state.review.reviews);
  const totalResults = useSelector((state) => state.review.totalResults);
  const status = useSelector((state) => state.review.status);
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  useEffect(() => {
    if (selectedProduct)
      dispatch(getProductReviews({ productId, start, limit }));
  }, [dispatch, start]);

  return (
    <div>
      {status === "loading" && !reviews ? (
        <h1>loading</h1>
      ) : (
        reviews.map((r) => <ReviewCard review={r} key={r.id} />)
      )}
      {reviews.length < totalResults && (
        <Button onClick={() => setStart((start) => start + 5)}>
          Load more
        </Button>
      )}
    </div>
  );
};

// export async function getServerSideProps(context) {
//   console.log("CONTEXT", context);
//   const res = await fetch(
//     `https://localhost:1337/reviews/product/607e59569f74552e70b98b91`
//   );
//   const reviews = await res.json();

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { reviews }, // will be passed to the page component as props
//   };
// }
export default ReviewList;
