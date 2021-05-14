import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "../product/Product";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    partialVisibilityGutter: 50,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 10,
  },
};

const CardCarousel = ({ data }) => {
  return (
    <Carousel
      partialVisible
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      // ssr={true} // means to render carousel on server-side.
      infinite={false}
      // autoPlay={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      transitionDuration={500}
      // containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="card-carousel-item"
    >
      {data.map((i) => (
        <Product maxW="200px" product={i} />
      ))}
    </Carousel>
  );
};

export default CardCarousel;
