import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Card, Rating, Button } from "@mui/material";
// import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT } from "../utils/queries";
import ProductDetails from "../components/ProductDetails";

/**
 * Individual product page
 */
export default function ProductPage() {
  const { productId } = useParams();

  const { loading, data } = useQuery(QUERY_PRODUCT, {
    variables: { productId },
    fetchPolicy: "no-cache",
  });

  const product = data?.product || {};
  return (
    <>
      {loading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : (
        <ProductDetails product={product} />
      )}
    </>
  );
}
