import React from "react";
import { Divider, Grid, Typography } from "@mui/material";

import Cart from "../components/Cart";
import OrderForm from "../components/OrderForm";

/**
 * Checkout page
 */
export default function CheckoutPage({ cartHandler }: any) {
  // Redirect to homepage if cart is empty
  if (cartHandler.cart.length < 1) {
    window.location.replace("/");
  }

  return (
    <>
      <Grid container flexDirection="column" width="100%" rowGap={2}>
        <Grid container flexDirection="row">
          <Grid item md={6} flexGrow={1} p={2}>
            <Typography variant="h5" sx={{ p: 2 }}>
              Order Details
            </Typography>
            <OrderForm cartHandler={cartHandler} />
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
