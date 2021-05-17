import React from "react";
// import { Image } from "@chakra-ui/react";
import Image from "next/image";

const test = () => {
  return (
    <Image
      width={250}
      height={300}
      quality={30}
      src="https://res.cloudinary.com/dilv93gvb/image/upload/v1616830147/kaayo/products/Al_xyvoj6.png"
    ></Image>
  );
};

export default test;
