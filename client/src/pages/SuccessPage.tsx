import React from "react";
import { Divider, Grid, Typography } from "@mui/material";

import { useSearchParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_ORDER } from "../utils/queries";

import DetailsTable from "../components/DetailsTable";

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

  const order = data?.order || {};

  const orderDetails = {
    label: "Order Details",
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

  const orderItems = {
    label: "Order Items",
    headers: ["Item", "Model", "Qty.", "Price", "Total"],
    entries: order?.items
      ? order?.items.map((item: any) => {
          return {
            row: item.product.fullName,
            values: [
              item.product.modelNumber,
              item.quantity,
              item.product.price,
              (item.quantity * item.product.price).toFixed(2),
            ],
          };
        })
      : [],
    footers: [
      { row: "Subtotal", values: ["$" + order.subtotal], spacer: 3 },
      { row: "Shipping", values: ["$" + order.shipping], spacer: 3 },
      { row: "Tax", values: ["$" + order.tax], spacer: 3 },
      { row: "Total", values: ["$" + order.total], spacer: 3 },
    ],
  };

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
        <Grid container flexDirection="row">
          <Grid item md={6} flexGrow={1} p={2}>
            <DetailsTable data={orderDetails} />
          </Grid>
          <Grid item md={6} flexGrow={1} p={2}>
            <DetailsTable data={orderItems} />
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    </>
  );
}
