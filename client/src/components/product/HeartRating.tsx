import React from "react";

import { Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

type HeartRatingProps = {
  value: number;
  readOnly?: boolean;
  size?: "small" | "medium" | "large";
};

/**
 * Heart icon rating out of 5
 */
export default function HeartRating({
  value,
  readOnly,
  size,
}: HeartRatingProps) {
  return (
    <StyledRating
      name="customized-color"
      defaultValue={value}
      getLabelText={(value: number) =>
        `${value} Heart${value !== 1 ? "s" : ""}`
      }
      precision={0.5}
      icon={<Favorite fontSize="inherit" />}
      emptyIcon={<FavoriteBorder fontSize="inherit" />}
      readOnly={readOnly}
      size={size || "large"}
    />
  );
}
