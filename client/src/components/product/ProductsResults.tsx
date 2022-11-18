import React, { ChangeEvent, useEffect, useState } from "react";

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

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

type PaginationOptions = {
  page?: number;
  perPage?: number;
  perPageOptions: number[];
};

type ProductResultsProps = {
  categoryId?: string;
  tagStates: TagStates;
  cartHandler: CartHandler;
  pagination?: PaginationOptions;
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

const defaultPagination = {
  page: 1,
  perPage: 0,
  perPageOptions: [8, 12, 24, 60],
};

export default function ProductsResults({
  categoryId,
  tagStates,
  cartHandler,
  pagination = defaultPagination,
}: ProductResultsProps) {
  // Current results page displayed state
  const [currentPage, setCurrentPage] = useState<number>(pagination.page || 1);
  const changePage = (_e: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Return to top of page when paginagion page is changed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Desired results per page state
  const [resultsPerPg, setResultsPerPg] = useState<number>(
    pagination.perPageOptions[pagination.perPage || 0]
  );
  const changePerPage = (e: SelectChangeEvent) => {
    setResultsPerPg(parseInt(e.target.value));
  };

  // Return to first page on category/tag change
  const { selectedTags } = tagStates;
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, selectedTags, resultsPerPg]);

  // Query products with tag/category filters
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    variables: {
      tags: tagStates?.selectedTags?.size
        ? Array.from(tagStates.selectedTags)
        : null,
      category: categoryId || null,
      page: currentPage,
      perPage: resultsPerPg,
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
  const totalPages = Math.ceil(productCount / resultsPerPg);

  return (
    <Grid container spacing={2}>
      {productCount > pagination.perPageOptions[0] && (
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
            sx={{ display: { xs: "none", sm: "flex" } }}
          />
          <FormControl>
            <InputLabel id="per-page">Per Page</InputLabel>
            <Select
              labelId="per-page"
              value={resultsPerPg.toString()}
              label="Results per Page"
              onChange={changePerPage}
              size="small"
              sx={{ width: 80 }}
            >
              {pagination.perPageOptions.map((option) => (
                <MenuItem value={option} key={option + "-per-pg"}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid
            container
            justifyContent="center"
            sx={{ mt: 1, display: { xs: "flex", sm: "none" } }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={changePage}
              color="primary"
            />
          </Grid>
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
            <Grid container justifyContent="center" my={2}>
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
