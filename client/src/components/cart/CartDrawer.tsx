import React from "react";
import { Box, Drawer, Divider } from "@mui/material";
import { ShoppingCartCheckout, ShoppingBasket } from "@mui/icons-material";

import Cart from "./Cart";
import ButtonSet from "../ButtonSet";

export default function CartDrawer({ open, toggleDrawers, cartHandler }: any) {
  const buttons = [
    {
      icon: (
        <ShoppingBasket
          color={cartHandler.cart.length < 1 ? "disabled" : "primary"}
        />
      ),
      label: "View Cart",
      path: "/cart",
      disabled: cartHandler.cart.length < 1,
      variant: "outlined",
    },
    {
      icon: (
        <ShoppingCartCheckout
          sx={{ color: cartHandler.cart.length < 1 ? "gray" : "white" }}
        />
      ),
      label: "Checkout",
      path: "/cart/checkout",
      disabled: cartHandler.cart.length < 1,
      variant: "contained",
    },
  ];

  return (
    <>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={toggleDrawers("cart", false)}
      >
        <Box
          sx={{
            width: { xs: 300, sm: 350, md: 400 },
          }}
          role="presentation"
        >
          <Cart cartHandler={cartHandler} />
          <Divider />
          <ButtonSet buttons={buttons} span />
        </Box>
      </Drawer>
    </>
  );
}
