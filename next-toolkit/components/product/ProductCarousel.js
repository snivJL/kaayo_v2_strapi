import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Box, Image } from "@chakra-ui/react";

const ProductCarousel = ({ images }) => {
  return (
    <Carousel
      showStatus={false}
      showArrows={false}
      autoPlay={true}
      infiniteLoop={true}
      swipeable={true}
      emulateTouch={true}
    >
      {images.map((i) => (
        <Box cursor="grab">
          <img src={i.name} alt="Picture of the product" />
          {/* <p className="legend">Legend 1</p> */}
        </Box>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
