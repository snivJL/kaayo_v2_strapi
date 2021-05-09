import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { Text } from "@chakra-ui/react";
import { getAverageRating } from "../../lib/utils";
const Rating = ({ product, size = "1x", numReviews }) => {
  const value = getAverageRating(product);
  return (
    <Text color={"#C39E5C"}>
      {value >= 1 ? (
        <FontAwesomeIcon size={size} icon={faStar} />
      ) : value >= 0.5 ? (
        <FontAwesomeIcon size={size} icon={faStarHalfAlt} />
      ) : (
        <FontAwesomeIcon size={size} icon={emptyStar} />
      )}
      {value >= 2 ? (
        <FontAwesomeIcon size={size} icon={faStar} />
      ) : value >= 1.5 ? (
        <FontAwesomeIcon size={size} icon={faStarHalfAlt} />
      ) : (
        <FontAwesomeIcon size={size} icon={emptyStar} />
      )}
      {value >= 3 ? (
        <FontAwesomeIcon size={size} icon={faStar} />
      ) : value >= 2.5 ? (
        <FontAwesomeIcon size={size} icon={faStarHalfAlt} />
      ) : (
        <FontAwesomeIcon size={size} icon={emptyStar} />
      )}
      {value >= 4 ? (
        <FontAwesomeIcon size={size} icon={faStar} />
      ) : value >= 3.5 ? (
        <FontAwesomeIcon size={size} icon={faStarHalfAlt} />
      ) : (
        <FontAwesomeIcon size={size} icon={emptyStar} />
      )}
      {value >= 5 ? (
        <FontAwesomeIcon size={size} icon={faStar} />
      ) : value >= 4.5 ? (
        <FontAwesomeIcon size={size} icon={faStarHalfAlt} />
      ) : (
        <FontAwesomeIcon size={size} icon={emptyStar} />
      )}
      <Text pl={1} as="span" fontSize="xs">
        {numReviews > 0 ? `(${numReviews})` : "(0)"}{" "}
      </Text>
    </Text>
  );
};

export default Rating;
