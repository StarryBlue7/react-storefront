import React from "react";
import { Grid, Typography, Card, Rating, Button } from "@mui/material";
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

/**
 * Individual product info
 */
export default function ProductDetails({ product }: any) {
  return (
    <Card sx={{ width: "auto", mt: 5, borderRadius: 5, p: 3 }}>
      <Grid container justifyContent={"evenly"} gap={3}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src={product.imgURL}
            alt={product.fullName}
            style={{ maxWidth: "100%", maxHeight: "50vh" }}
          />
        </Grid>
        <Grid item xs={12} sm={5} sx={{}}>
          <Typography variant="h4">{product.fullName}</Typography>
          <StyledRating
            name="customized-color"
            defaultValue={4.5}
            getLabelText={(value: number) =>
              `${value} Heart${value !== 1 ? "s" : ""}`
            }
            precision={0.5}
            icon={<Favorite fontSize="inherit" />}
            emptyIcon={<FavoriteBorder fontSize="inherit" />}
          />
          <Typography sx={{ mt: 5 }}>{product.description}</Typography>
          <Button>Add to Cart</Button>
        </Grid>
      </Grid>
    </Card>
  );
}
