import React from "react";
import { Fab } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

export default function CartButton({ toggleDrawers }: any) {
  return (
    <Fab
      aria-label="cart"
      color="secondary"
      sx={{ position: "fixed", bottom: 20, right: 20, display: { md: "none" } }}
      onClick={toggleDrawers("cart", true)}
    >
      <ShoppingCart />
    </Fab>
  );
}
