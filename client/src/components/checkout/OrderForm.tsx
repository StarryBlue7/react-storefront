import React, { SyntheticEvent, useState } from "react";

import { Tabs, Tab, Container } from "@mui/material";

import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import CheckoutForm from "./CheckoutForm";

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

type ShippingOption = {
  cost: number;
  label: string;
  timeline: string;
};

type Shipping = {
  shippingOptions: ShippingOption[];
  shippingOption: number;
  chooseShipping: (option: number) => () => void;
};

type OrderFormProps = {
  cartHandler: CartHandler;
  authHandler: AuthHandler;
  shipping: Shipping;
};

/**
 * Order details panel
 */
export default function OrderForm({
  cartHandler,
  authHandler,
  shipping,
}: OrderFormProps) {
  const [authTab, setAuthTab] = useState<number>(0);
  const changeTab = (_e: SyntheticEvent, tabIndex: number) => {
    setAuthTab(tabIndex);
  };

  return (
    <>
      {authHandler.loggedIn ? (
        <>
          <Container sx={{ py: 1 }}>
            <CheckoutForm cartHandler={cartHandler} shipping={shipping} />
          </Container>
        </>
      ) : (
        <>
          <Tabs
            value={authTab}
            onChange={changeTab}
            indicatorColor="primary"
            centered
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
            <Tab label="Checkout as Guest" />
          </Tabs>
          <Container sx={{ py: 1 }}>
            {authTab === 0 && <LoginForm authHandler={authHandler} />}
            {authTab === 1 && <SignupForm authHandler={authHandler} />}
            {authTab === 2 && (
              <CheckoutForm cartHandler={cartHandler} shipping={shipping} />
            )}
          </Container>
        </>
      )}
    </>
  );
}
