import React, { ChangeEvent, useEffect, useState } from "react";

import { Grid, Pagination, Typography } from "@mui/material";

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

type PaginationData = {
  page?: number;
  perPage?: number;
  count: number;
};

type ProductData = {
  results: Product[];
  pagination: PaginationData;
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

  // Return to first page on category/tag change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, tagStates]);

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
    fetchPolicy: "cache-first",
  });

  // Product data updated only when results returned
  const [productData, setProductData] = useState<ProductData>({
    results: [],
    pagination: { count: 0 },
  });

  useEffect(() => {
    if (data?.products) {
      setProductData(data?.products);
    }
  }, [data]);

  const products = productData.results;
  const productCount = productData.pagination.count;

  // Page total state
  const totalPages = Math.ceil(productCount / perPage);

  return (
    <Grid container spacing={2}>
      {totalPages > 1 && (
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          ml={2}
          mt={2}
        >
          <Typography>{productCount} Results</Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={changePage}
            color="primary"
          />
          <Typography>{productCount} Results</Typography>
        </Grid>
      )}
      {loading || products.length < 1 ? (
        <Grid container justifyContent="center" my={5}>
          {loading && <Loader message="Loading results..." />}
          {!loading && products.length < 1 && (
            <Typography variant="h4">No results!</Typography>
          )}
        </Grid>
      ) : (
        <>
          {products.map((product: Product, i: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} m={0} key={i}>
              <ProductCard
                product={product}
                key={product._id}
                cartHandler={cartHandler}
              />
            </Grid>
          ))}
          {totalPages > 1 && (
            <Grid container justifyContent="center" mt={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={changePage}
                color="primary"
              />
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
}
