import React from "react";

import { Grid } from "@mui/material";

import { useParams } from "react-router-dom";

import CategoryBreadcrumbs from "../components/categories/CategoryBreadcrumbs";
import ProductsResults from "../components/product/ProductsResults";
import PromoCarousel from "../components/PromoCarousel";
import TagList from "../components/TagList";

type TagStates = {
  selectedTags: Set<string>;
  toggleTag: (tag: string) => () => void;
};

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

type CategoryPageProps = {
  tagStates: TagStates;
  cartHandler: CartHandler;
};

/**
 * Homepage component
 */
export default function CategoryPage({
  tagStates,
  cartHandler,
}: CategoryPageProps) {
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
