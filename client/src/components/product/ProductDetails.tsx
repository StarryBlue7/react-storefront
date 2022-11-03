import React from "react";
import { Grid, Typography, Card, Button } from "@mui/material";
import HeartRating from "./HeartRating";

/**
 * Individual product info
 */
export default function ProductDetails({ product, cartHandler }: any) {
  return (
    <Card sx={{ width: "100%", mt: { xs: 2, sm: 5 }, borderRadius: 5, p: 3 }}>
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
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
          }}
        >
          <Typography variant="h4">{product.fullName}</Typography>
          <Typography variant="caption">{product.modelNumber}</Typography>
          <HeartRating value={product.rating || 4.5} />
          <Typography variant="h4">{"$" + product.price}</Typography>
          <Button onClick={cartHandler.addToCart(product)} variant="contained">
            Add to Cart
          </Button>
          <Typography sx={{ mt: 5 }}>{product.description}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
