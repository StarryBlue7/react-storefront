import React, { EventHandler, ReactNode, SyntheticEvent } from "react";

import { Box, Drawer, Divider } from "@mui/material";
import { ShoppingCartCheckout, ShoppingBasket } from "@mui/icons-material";

import Cart from "./Cart";
import ButtonSet from "../ButtonSet";

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

type CartDrawerProps = {
  open: boolean;
  toggleDrawers: (
    drawer: PageDrawer,
    open: boolean
  ) => EventHandler<SyntheticEvent>;
  cartHandler: CartHandler;
};

type ButtonConfig = {
  icon?: ReactNode;
  label: string;
  path?: string;
  disabled?: boolean;
  function?: () => void;
  variant?: "text" | "outlined" | "contained" | undefined;
};

export default function CartDrawer({
  open,
  toggleDrawers,
  cartHandler,
}: CartDrawerProps) {
  const buttons: ButtonConfig[] = [
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
