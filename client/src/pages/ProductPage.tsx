import React from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT } from "../utils/queries";
import ProductDetails from "../components/product/ProductDetails";
import ProductsCarousel from "../components/product/ProductsCarousel";
import Loader from "../components/feedback/Loader";
import CategoryBreadcrumbs from "../components/categories/CategoryBreadcrumbs";

/**
 * Individual product page
 */
export default function ProductPage({ cartHandler }: any) {
  const { productId } = useParams();

  const { loading, data } = useQuery(QUERY_PRODUCT, {
    variables: { productId },
    fetchPolicy: "no-cache",
  });

  const product = data?.product || {};
  return loading ? (
    <Loader />
  ) : (
    <Grid container width="100%" rowGap={2}>
      <CategoryBreadcrumbs
        categoryId={product.categories[product.categories.length - 1]._id}
      />
      <ProductDetails product={product} cartHandler={cartHandler} />
      <ProductsCarousel
        title="Similar items: "
        tags={product.tags.map((tag: any) => tag._id)}
        exclude={product._id}
      />
    </Grid>
  );
}
