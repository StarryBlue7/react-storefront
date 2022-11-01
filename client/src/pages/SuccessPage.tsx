import React from "react";
import { Divider, Grid, Typography } from "@mui/material";

import { useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ORDER } from "../utils/queries";

import Cart from "../components/Cart";
import DetailsTable from "../components/DetailsTable";

/**
 * Individual product page
 */
export default function SuccessPage({ cartHandler }: any) {
  const [searchParams] = useSearchParams();

  const stripeId = searchParams.get("payment_intent");

  const { loading, data } = useQuery(QUERY_ORDER, {
    variables: { stripeId },
    fetchPolicy: "no-cache",
  });

  const order = data?.order || {};

  const orderDetails = {
    label: "Order Details",
    // headers: ["Field", "Value"],
    entries: [
      { row: "Order Number", values: [order.orderNum] },
      {
        row: "Order Placed",
        values: [new Date(parseInt(order.paidOn)).toLocaleString()],
      },
      { row: "Subtotal", values: ["$" + order.subtotal] },
      { row: "Shipping Address", values: [order.toAddress] },
      { row: "Estimated Arrival", values: [order.estimatedArrival || "TBD"] },
    ],
  };

  return loading || !data ? (
    <Typography variant="h3">Loading...</Typography>
  ) : (
    <>
      <Grid container flexDirection="column" width="100%" rowGap={2}>
        <Grid container flexDirection="row">
          <Grid item md={6} flexGrow={1} p={2}>
            <Typography variant="h5" sx={{ p: 2 }}>
              Order Complete!
            </Typography>
            <DetailsTable data={orderDetails} />
          </Grid>
          <Grid item md={6} flexGrow={1} p={2}>
            <Cart cartHandler={cartHandler} label="Items" disable />
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    </>
  );
}
