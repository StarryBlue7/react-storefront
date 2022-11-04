import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import Loader from "../feedback/Loader";

type Product = {
  _id: string;
  fullName: string;
  shortName: string;
  imgURL: string;
  description: string;
  tags: string[];
  price: number;
};

export default function ProductsResults({
  tagStates,
  categoryId,
  cartHandler,
}: any) {
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    variables: {
      tags:
        tagStates?.selectedTags?.size || tagStates?.selectedTags?.length
          ? Array.from(tagStates.selectedTags)
          : null,
      category: categoryId || null,
    },
    fetchPolicy: "no-cache",
  });

  const products = data?.products || [];

  return (
    <Grid container spacing={2}>
      {loading ? (
        <Loader message="Loading results..." />
      ) : (
        products.map((product: Product, i: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} m={0} key={i}>
            <ProductCard
              product={product}
              key={product._id}
              cartHandler={cartHandler}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
}
