import React from "react";
import { Divider, Grid, Typography } from "@mui/material";

import { useSearchParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_ORDER } from "../utils/queries";

import OrderDetails from "../components/OrderDetails";

/**
 * Successful order complete page
 */
export default function SuccessPage({ cartHandler }: any) {
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

  return loading || !data ? (
    <Typography variant="h3">Loading...</Typography>
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
      </Grid>
    </>
  );
}
