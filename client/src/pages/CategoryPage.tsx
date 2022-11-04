import { Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import CategoryBreadcrumbs from "../components/categories/CategoryBreadcrumbs";
import ProductsResults from "../components/product/ProductsResults";
import PromoCarousel from "../components/PromoCarousel";
import TagList from "../components/TagList";

/**
 * Homepage component
 */
export default function CategoryPage({ tagStates, cartHandler }: any) {
  const { categoryId } = useParams();
  return (
    <>
      <PromoCarousel />
      <Grid container width="100%" rowGap={2} sx={{ pt: { xs: 2, sm: 5 } }}>
        <CategoryBreadcrumbs categoryId={categoryId} />
        <TagList tagStates={tagStates} />
        <ProductsResults
          tagStates={tagStates}
          categoryId={categoryId}
          cartHandler={cartHandler}
        />
      </Grid>
    </>
  );
}
