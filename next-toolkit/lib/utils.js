export const getAverageRating = (product) => {
  return (
    product.reviews.reduce((acc, r) => {
      return (acc += r.rating);
    }, 0) /
    (product.reviews.length - 1)
  );
};

export const getNumReviews = (product) => {
  return product.reviews.length - 1;
};
