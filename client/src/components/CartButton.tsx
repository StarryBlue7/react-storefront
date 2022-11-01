import React from "react";
import { Badge, Fab } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

export default function CartButton({ toggleDrawers, cartHandler }: any) {
  return (
    <Fab
      aria-label="cart"
      color="secondary"
      sx={{ position: "fixed", bottom: 20, right: 20, display: { md: "none" } }}
      onClick={toggleDrawers("cart", true)}
    >
      {/* Cart item qty badge on cart icon */}
      <Badge
        badgeContent={cartHandler?.totals.totalQty}
        color="primary"
        overlap="rectangular"
      >
        <ShoppingCart />
      </Badge>
    </Fab>
  );
}
