import React from "react";

import { Grid } from "@mui/material";

import DetailsTable from "../DetailsTable";

type Product = {
  _id: string;
  fullName: string;
  modelNumber: string;
};

type Item = {
  product: Product;
  quantity: number;
  priceAtSale: number;
};

type Address = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
};

type Order = {
  orderNum: string;
  tax: number;
  taxPercent: number;
  total: number;
  items: Item[];
  paidOn: string;
  subtotal: number;
  shipping: number;
  toAddress: Address;
  shippedOn: string;
  estimatedArrival: string;
  itemCount: number;
};

type OrderDetailsProps = {
  order: Order;
};

/**
 * Order details display
 */
export default function OrderDetails({ order }: OrderDetailsProps) {
  const orderDetails = {
    label: "Order Details",
    entries: [
      { row: "Order Number", values: [order.orderNum] },
      {
        row: "Order Placed",
        values: [
          order.paidOn
            ? new Date(parseInt(order.paidOn)).toLocaleString()
            : "Payment Processing",
        ],
      },
      { row: "Total", values: ["$" + order.total] },
      {
        row: "Shipping Address",
        values: [
          `${order.toAddress.address1}
${order.toAddress.address2},
${order.toAddress.city}, ${order.toAddress.state} ${order.toAddress.postcode}`,
        ],
      },
      {
        row: "Estimated Arrival",
        values: [
          order.estimatedArrival
            ? new Date(parseInt(order.estimatedArrival)).toLocaleString()
            : "TBD",
        ],
      },
    ],
  };

  const orderItems = {
    label: "Order Items",
    headers: ["Item", "Qty.", "Price", "Total"],
    entries: order?.items
      ? order?.items.map((item: Item) => {
          return {
            row: `${item.product.fullName} (${item.product.modelNumber})`,
            values: [
              item.quantity,
              item.priceAtSale.toFixed(2),
              (item.quantity * item.priceAtSale).toFixed(2),
            ],
          };
        })
      : [],
    footers: [
      { row: "Subtotal", values: ["$" + order.subtotal.toFixed(2)], spacer: 2 },
      { row: "Shipping", values: ["$" + order.shipping.toFixed(2)], spacer: 2 },
      { row: "Tax", values: ["$" + order.tax.toFixed(2)], spacer: 2 },
      { row: "Total", values: ["$" + order.total.toFixed(2)], spacer: 2 },
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
