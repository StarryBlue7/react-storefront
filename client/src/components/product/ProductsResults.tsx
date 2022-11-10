import React from "react";

import { Grid } from "@mui/material";

import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";

import ProductCard from "./ProductCard";
import Loader from "../feedback/Loader";

type Tag = {
  _id: string;
  name: string;
};

type TagStates = {
  selectedTags: Set<string>;
  toggleTag: (tag: string) => () => void;
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

type ProductResultsProps = {
  categoryId?: string;
  tagStates: TagStates;
  cartHandler: CartHandler;
};

export default function ProductsResults({
  categoryId,
  tagStates,
  cartHandler,
}: ProductResultsProps) {
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    variables: {
      tags: tagStates?.selectedTags?.size
        ? Array.from(tagStates.selectedTags)
        : null,
      category: categoryId || null,
      page: 1,
      perPage: 12,
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
