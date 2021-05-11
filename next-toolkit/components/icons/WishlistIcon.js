import React from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WishlistIcon = ({ inWishlist }) => {
  return (
    <FontAwesomeIcon
      color="red"
      size="lg"
      icon={faHeart}
      style={
        inWishlist
          ? { transition: "opacity 0.5s ease", opacity: "100%" }
          : { transition: "opacity 0.5s ease", opacity: "30%" }
      }
    ></FontAwesomeIcon>
  );
};

export default WishlistIcon;
