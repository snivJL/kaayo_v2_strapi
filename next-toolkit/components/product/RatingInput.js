import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { Text } from "@chakra-ui/react";

const RatingInput = ({ handleRating, size = "1x", rating }) => {
  return (
    <Text color={"#C39E5C"}>
      {rating >= 1 ? (
        <FontAwesomeIcon
          onClick={() => handleRating(1)}
          size={size}
          icon={faStar}
        />
      ) : rating >= 0.5 ? (
        <FontAwesomeIcon
          onClick={() => handleRating(1)}
          size={size}
          icon={faStarHalfAlt}
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => handleRating(1)}
          size={size}
          icon={emptyStar}
        />
      )}
      {rating >= 2 ? (
        <FontAwesomeIcon
          onClick={() => handleRating(2)}
          size={size}
          icon={faStar}
        />
      ) : rating >= 1.5 ? (
        <FontAwesomeIcon
          onClick={() => handleRating(2)}
          size={size}
          icon={faStarHalfAlt}
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => handleRating(2)}
          size={size}
          icon={emptyStar}
        />
      )}
      {rating >= 3 ? (
        <FontAwesomeIcon
          onClick={() => handleRating(3)}
          size={size}
          icon={faStar}
        />
      ) : rating >= 2.5 ? (
        <FontAwesomeIcon
          onClick={() => handleRating(3)}
          size={size}
          icon={faStarHalfAlt}
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => handleRating(3)}
          size={size}
          icon={emptyStar}
        />
      )}
      {rating >= 4 ? (
        <FontAwesomeIcon
          onClick={() => handleRating(4)}
          size={size}
          icon={faStar}
        />
      ) : rating >= 3.5 ? (
        <FontAwesomeIcon
          onClick={() => handleRating(4)}
          size={size}
          icon={faStarHalfAlt}
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => handleRating(4)}
          size={size}
          icon={emptyStar}
        />
      )}
      {rating >= 5 ? (
        <FontAwesomeIcon
          onClick={() => handleRating(5)}
          size={size}
          icon={faStar}
        />
      ) : rating >= 4.5 ? (
        <FontAwesomeIcon
          onClick={() => handleRating(5)}
          size={size}
          icon={faStarHalfAlt}
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => handleRating(5)}
          size={size}
          icon={emptyStar}
        />
      )}
    </Text>
  );
};

export default RatingInput;
