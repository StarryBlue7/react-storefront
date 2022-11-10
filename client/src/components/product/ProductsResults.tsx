import React, { ChangeEvent, useMemo, useState } from "react";

import { Grid, Pagination } from "@mui/material";

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
  page?: number;
  perPage?: number;
};

export default function ProductsResults({
  categoryId,
  tagStates,
  cartHandler,
  page = 1,
  perPage = 12,
}: ProductResultsProps) {
  // Results page state
  const [currentPage, setCurrentPage] = useState<number>(page);

  const changePage = (_e: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Query products with tag/category filters
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    variables: {
      tags: tagStates?.selectedTags?.size
        ? Array.from(tagStates.selectedTags)
        : null,
      category: categoryId || null,
      page: currentPage,
      perPage,
    },
    fetchPolicy: "no-cache",
  });

  const products = data?.products.results || [];
  const productCount = data?.products.pagination.count;

  const totalPages = useMemo(() => {
    return Math.ceil(productCount / perPage);
  }, [productCount, perPage]);

  return (
    <Grid container spacing={2}>
      {loading ? (
        <Loader message="Loading results..." />
      ) : (
        <>
          <Grid container justifyContent="center" mt={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={changePage}
              color="primary"
            />
          </Grid>
          {products.map((product: Product, i: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} m={0} key={i}>
              <ProductCard
                product={product}
                key={product._id}
                cartHandler={cartHandler}
              />
            </Grid>
          ))}
          <Grid container justifyContent="center" mt={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={changePage}
              color="primary"
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}
