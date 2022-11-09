import React from "react";

import { Grid, Typography, Card, Button } from "@mui/material";

import HeartRating from "./HeartRating";

type Tag = {
  _id: string;
  name: string;
};

type Product = {
  _id: string;
  fullName: string;
  shortName: string;
  modelNumber: string;
  imgURL: string;
  description: string;
  rating?: number;
  tags: Tag[];
  price: number;
};

type Item = {
  product: Product;
  quantity: number;
};

type Totals = {
  totalPrice: number;
  totalQty: number;
};

type CartHandler = {
  cartLoading: boolean;
  cart: Item[];
  totals: Totals;
  addToCart: (product: Product, quantity?: number) => () => void;
  updateQty: (productId: string, quantity: number) => () => void;
  deleteItem: (productId: string) => () => void;
  updateCart: (cart: Item[]) => () => void;
  clearAll: () => () => void;
};

type ProductDetailsProps = {
  product: Product;
  cartHandler: CartHandler;
};

/**
 * Individual product info
 */
export default function ProductDetails({
  product,
  cartHandler,
}: ProductDetailsProps) {
  return (
    <Card sx={{ width: "100%", borderRadius: 5, p: 3 }}>
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
