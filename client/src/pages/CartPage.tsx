import React from "react";
import {
  RemoveShoppingCartOutlined,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import { Divider, Grid } from "@mui/material";

import Cart from "../components/Cart";
import ButtonSet from "../components/ButtonSet";

/**
 * Cart page
 */
export default function CartPage({ cartHandler }: any) {
  const buttons = [
    {
      icon: (
        <RemoveShoppingCartOutlined
          color={cartHandler.cart.length < 1 ? "disabled" : "primary"}
        />
      ),
      label: "Clear Cart",
      disabled: cartHandler.cart.length < 1,
      function: cartHandler.clearAll(),
      variant: "outlined",
    },
    {
      icon: (
        <ShoppingCartCheckout
          sx={{ color: cartHandler.cart.length < 1 ? "gray" : "white" }}
        />
      ),
      label: "Proceed to Checkout",
      disabled: cartHandler.cart.length < 1,
      path: "checkout",
      variant: "contained",
    },
  ];

  return (
    <>
      <Grid container flexDirection="column" width="100%" rowGap={2}>
        <Grid item>
          <Cart cartHandler={cartHandler} />
        </Grid>
        <Grid item>
          <Divider />
          <ButtonSet buttons={buttons} />
        </Grid>
      </Grid>
    </>
  );
}
