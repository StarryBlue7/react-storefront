import React from "react";

import { Grid } from "@mui/material";

import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT } from "../utils/queries";

import ProductDetails from "../components/product/ProductDetails";
import ProductsCarousel from "../components/product/ProductsCarousel";
import Loader from "../components/feedback/Loader";
import CategoryBreadcrumbs from "../components/categories/CategoryBreadcrumbs";

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

type ProductPageProps = {
  cartHandler: CartHandler;
};

/**
 * Individual product page
 */
export default function ProductPage({ cartHandler }: ProductPageProps) {
  const { productId } = useParams();

  const { loading, data } = useQuery(QUERY_PRODUCT, {
    variables: { productId },
    fetchPolicy: "no-cache",
  });

  const product = data?.product || {};

  // Use first 3 tags of product to recommend additional products
  const recommendTags =
    product.tags?.slice(0, 3).map((tag: any) => tag._id) || [];

  return loading ? (
    <Loader />
  ) : (
    <Grid container width="100%" rowGap={2} sx={{ pt: { xs: 2, sm: 5 } }}>
      <CategoryBreadcrumbs
        categoryId={product.categories[product.categories.length - 1]._id}
      />
      <ProductDetails product={product} cartHandler={cartHandler} />
      <ProductsCarousel
        title="Similar items: "
        tags={recommendTags}
        exclude={product._id}
      />
    </Grid>
  );
}
