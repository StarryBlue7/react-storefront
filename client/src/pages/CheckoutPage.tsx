import React from "react";
import { Divider, Grid, Typography } from "@mui/material";

import Cart from "../components/Cart";
import OrderDetails from "../components/OrderDetails";

/**
 * Checkout page
 */
export default function CheckoutPage({ cartHandler }: any) {
  return (
    <>
      <Grid container flexDirection="column" width="100%" rowGap={2}>
        <Grid container flexDirection="row">
          <Grid item md={6} flexGrow={1} p={2}>
            <Typography variant="h5" sx={{ p: 2 }}>
              Order Details
            </Typography>
            <OrderDetails cartHandler={cartHandler} />
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
