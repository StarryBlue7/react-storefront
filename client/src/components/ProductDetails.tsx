import React from "react";
import { Grid, Typography, Card, Button } from "@mui/material";
import HeartRating from "./HeartRating";

/**
 * Individual product info
 */
export default function ProductDetails({ product }: any) {
  return (
    <Card sx={{ width: "100%", mt: 5, borderRadius: 5, p: 3 }}>
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
          <HeartRating value={product.rating || 4.5} readOnly />
          <Typography variant="h4">{"$" + product.price}</Typography>
          <Typography sx={{ mt: 5 }}>{product.description}</Typography>
          <Button>Add to Cart</Button>
        </Grid>
      </Grid>
    </Card>
  );
}
