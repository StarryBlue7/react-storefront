import React from "react";
import { Grid, Typography } from "@mui/material";
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

export default function ProductsResults({
  tagStates,
  categoryStates,
  cartHandler,
}: any) {
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    variables: {
      tags:
        tagStates?.selectedTags?.size || tagStates?.selectedTags?.length
          ? Array.from(tagStates.selectedTags)
          : null,
      category: categoryStates?.selectedCategory || null,
    },
    fetchPolicy: "no-cache",
  });

  const products = data?.products || [];

  return (
    <Grid container spacing={2}>
      {loading ? (
        <Typography>Loading results...</Typography>
      ) : (
        products.map((product: Product, i: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} m={0} key={i}>
            <ProductCard
              product={product}
              key={product._id}
              m={0}
              cartHandler={cartHandler}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
}
