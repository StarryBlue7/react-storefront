import React from "react";

import { Divider, Grid, Typography } from "@mui/material";

import { useSearchParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_ORDER } from "../utils/queries";

import OrderDetails from "../components/order/OrderDetails";
import ButtonSet from "../components/ButtonSet";
import Loader from "../components/feedback/Loader";

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

type SuccessPageProps = {
  cartHandler: CartHandler;
};

/**
 * Successful order complete page
 */
export default function SuccessPage({ cartHandler }: SuccessPageProps) {
  const [searchParams] = useSearchParams();

  const stripeId = searchParams.get("payment_intent");

  // Redirect to main if accessed without payment_intent
  if (!stripeId) {
    window.location.replace("/");
  }

  const { loading, data } = useQuery(QUERY_ORDER, {
    variables: { stripeId },
    fetchPolicy: "no-cache",
  });

  React.useEffect(() => {
    if (data?.order) {
      cartHandler.clearAll()();
    }
  }, [data]); // eslint-disable-line
  // Ignore ESLint dependency suggestion to prevent cyclical useEffect calls

  const order = data?.order || {};

  const buttons = [{ label: "Continue Shopping", path: "/" }];

  return loading || !data ? (
    <Loader message="Completing order..." />
  ) : (
    <>
      <Grid container flexDirection="column" width="100%" rowGap={2}>
        <Grid item md={12} flexGrow={1} pt={2} px={2}>
          <Typography variant="h5" sx={{ pt: 2, px: 2 }}>
            Order Complete!
          </Typography>
        </Grid>
        <OrderDetails order={order} />
        <Divider />
        <ButtonSet buttons={buttons} />
      </Grid>
    </>
  );
}
