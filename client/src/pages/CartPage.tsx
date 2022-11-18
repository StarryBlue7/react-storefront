import React, { ReactNode } from "react";

import {
  RemoveShoppingCartOutlined,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import { Divider, Grid } from "@mui/material";

import Cart from "../components/cart/Cart";
import ButtonSet from "../components/ButtonSet";

type ButtonConfig = {
  icon?: ReactNode;
  label: string;
  path?: string;
  disabled?: boolean;
  function?: () => void;
  variant?: "text" | "outlined" | "contained" | undefined;
};

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

type CartPageProps = {
  cartHandler: CartHandler;
};

/**
 * Cart page
 */
export default function CartPage({ cartHandler }: CartPageProps) {
  const buttons: ButtonConfig[] = [
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
        <Divider />
        <Grid
          item
          sx={{ width: { sm: "100%", md: "50%" } }}
          alignSelf="flex-end"
        >
          <ButtonSet buttons={buttons} span />
        </Grid>
      </Grid>
    </>
  );
}
