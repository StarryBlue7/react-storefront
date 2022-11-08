import React from "react";
import { Divider, Grid, Typography } from "@mui/material";

import Cart from "../components/cart/Cart";
import OrderForm from "../components/checkout/OrderForm";

const shippingOptions = [
  { label: "Standard", timeline: "1-2 Weeks", cost: 7 },
  { label: "Priority", timeline: "5-7 Days", cost: 12 },
  { label: "Rush", timeline: "1-3 Days", cost: 30 },
];

/**
 * Checkout page
 */
export default function CheckoutPage({ cartHandler, authHandler }: any) {
  // Redirect to homepage if cart is empty
  if (cartHandler.cart.length < 1) {
    window.location.replace("/");
  }

  const [shippingOption, setShippingOption] = React.useState<number>(0);

  const shipping = {
    shippingOptions,
    shippingOption,
    chooseShipping: (option: number) => () => {
      // Select option if it is within options range
      if (option < shippingOptions.length && option >= 0) {
        setShippingOption(option);
      }
    },
  };

  return (
    <>
      <Grid container flexDirection="column" width="100%" rowGap={2}>
        <Grid container flexDirection="row">
          <Grid item md={6} flexGrow={1} p={2}>
            <Typography variant="h5" sx={{ p: 2 }}>
              Order Details
            </Typography>
            <OrderForm
              cartHandler={cartHandler}
              authHandler={authHandler}
              shipping={shipping}
            />
          </Grid>
          <Grid item md={6} flexGrow={1} p={2}>
            <Cart
              cartHandler={cartHandler}
              shippingCost={shippingOptions[shippingOption].cost}
              label="Items"
              tax
              total
              disable
            />
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    </>
  );
}
