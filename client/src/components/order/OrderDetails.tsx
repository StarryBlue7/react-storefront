import React from "react";
import { Grid } from "@mui/material";

import DetailsTable from "../DetailsTable";

/**
 * Order details display
 */
export default function OrderDetails({ order }: any) {
  const orderDetails = {
    label: "Order Details",
    entries: [
      { row: "Order Number", values: [order.orderNum] },
      {
        row: "Order Placed",
        values: [new Date(parseInt(order.paidOn)).toLocaleString()],
      },
      { row: "Total", values: ["$" + order.total] },
      { row: "Shipping Address", values: [order.toAddress] },
      { row: "Estimated Arrival", values: [order.estimatedArrival || "TBD"] },
    ],
  };

  const orderItems = {
    label: "Order Items",
    headers: ["Item", "Qty.", "Price", "Total"],
    entries: order?.items
      ? order?.items.map((item: any) => {
          return {
            row: `${item.product.fullName} (${item.product.modelNumber})`,
            values: [
              item.quantity,
              item.priceAtSale,
              (item.quantity * item.priceAtSale).toFixed(2),
            ],
          };
        })
      : [],
    footers: [
      { row: "Subtotal", values: ["$" + order.subtotal], spacer: 2 },
      { row: "Shipping", values: ["$" + order.shipping], spacer: 2 },
      { row: "Tax", values: ["$" + order.tax], spacer: 2 },
      { row: "Total", values: ["$" + order.total], spacer: 2 },
    ],
  };

  return (
    <>
      <Grid container flexDirection="row">
        <Grid item md={6} flexGrow={1} px={{ xs: 0, sm: 2 }} pb={2}>
          <DetailsTable data={orderDetails} />
        </Grid>
        <Grid item md={6} flexGrow={1} px={{ xs: 0, sm: 2 }} pb={2}>
          <DetailsTable data={orderItems} />
        </Grid>
      </Grid>
    </>
  );
}
