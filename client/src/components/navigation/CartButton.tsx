import React, { EventHandler, SyntheticEvent } from "react";

import { Badge, Fab } from "@mui/material";

import { ShoppingCart } from "@mui/icons-material";

type Tag = {
  _id: string;
  name: string;
};

type Product = {
  _id: string;
  fullName: string;
  shortName: string;
  modelNumber: string;
  imgURL: string;
  description: string;
  rating?: number;
  tags: Tag[];
  price: number;
};

type Item = {
  product: Product;
  quantity: number;
};

type Totals = {
  totalPrice: number;
  totalQty: number;
};

type CartHandler = {
  cartLoading: boolean;
  cart: Item[];
  totals: Totals;
  addToCart: (product: Product, quantity?: number) => () => void;
  updateQty: (productId: string, quantity: number) => () => void;
  deleteItem: (productId: string) => () => void;
  updateCart: (cart: Item[]) => () => void;
  clearAll: () => () => void;
};

type PageDrawer = "categories" | "cart";

type CartButtonProps = {
  toggleDrawers: (
    drawer: PageDrawer,
    open: boolean
  ) => EventHandler<SyntheticEvent>;
  cartHandler: CartHandler;
};

export default function CartButton({
  toggleDrawers,
  cartHandler,
}: CartButtonProps) {
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
