import React, { useState } from "react";

import { Divider, Grid, Typography } from "@mui/material";

import Cart from "../components/cart/Cart";
import OrderForm from "../components/checkout/OrderForm";

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

type AuthHandler = {
  loggedIn: boolean;
  authRefresh: () => void;
  login: (token: string) => void;
  logout: () => void;
};

type CheckoutPageProps = {
  cartHandler: CartHandler;
  authHandler: AuthHandler;
};

const shippingOptions = [
  { label: "Standard", timeline: "1-2 Weeks", cost: 7 },
  { label: "Priority", timeline: "5-7 Days", cost: 12 },
  { label: "Rush", timeline: "1-3 Days", cost: 30 },
];

/**
 * Checkout page
 */
export default function CheckoutPage({
  cartHandler,
  authHandler,
}: CheckoutPageProps) {
  // Redirect to homepage if cart is empty
  if (cartHandler.cart.length < 1) {
    window.location.replace("/");
  }

  const [shippingOption, setShippingOption] = useState<number>(0);

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
