import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";

interface Product {
  _id: string;
  fullName: string;
  shortName: string;
  imgURL: string;
  description: string;
}

export default function ProductsResults({ products: prop }: any) {
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    fetchPolicy: "no-cache",
  });

  const products = data?.products || [];

  return (
    <Grid container spacing={2}>
      {products.map((product: Product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} m={0}>
          <ProductCard product={product} key={product._id} m={0} />
        </Grid>
      ))}
    </Grid>
  );
}
