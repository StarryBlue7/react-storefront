import React, { useMemo } from "react";

import {
  List,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import CartItem from "./CartItem";

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

type CartProps = {
  cartHandler: CartHandler;
  label?: string;
  shippingCost?: number;
  disable?: boolean;
  tax?: boolean;
  total?: boolean;
};

const styles = {
  totals: { textAlign: "right", width: "50%" },
  links: { textDecoration: "none", flexGrow: 1 },
  cartButton: { width: "100%" },
  cartButtonIcon: { minWidth: 0, mr: 1 },
};

const taxRate = 0.0725;

export default function Cart({
  cartHandler,
  label = "Shopping Cart",
  shippingCost,
  disable = false,
  tax = false,
  total = false,
}: CartProps) {
  const estimatedTax = useMemo(() => {
    const tax = cartHandler.totals.totalPrice * taxRate;
    return Number(tax.toFixed(2));
  }, [cartHandler]);

  const totalCharge = useMemo(() => {
    const taxCharge = tax ? estimatedTax : 0;
    const shippingCharge = shippingCost || 0;
    const total = cartHandler.totals.totalPrice + taxCharge + shippingCharge;
    return Number(total.toFixed(2));
  }, [cartHandler, estimatedTax, tax, shippingCost]);

  return (
    <>
      <Typography variant="h5" sx={{ px: 2, pt: 2 }}>
        {label}
        {cartHandler.cart.length > 0 ? ` (${cartHandler.totals.totalQty})` : ""}
      </Typography>
      <List sx={{ minHeight: "40vh" }}>
        {cartHandler.cart.map((item: Item) => (
          <CartItem
            item={item}
            cartHandler={cartHandler}
            key={item.product._id}
            disable={disable}
          />
        ))}
      </List>
      <Divider />
      <List sx={{ px: 2 }}>
        <ListItem key={"total-items"} disablePadding>
          <ListItemText primary={"Items:"} sx={styles.totals} />
          <ListItemText
            primary={cartHandler.totals.totalQty}
            sx={styles.totals}
          />
        </ListItem>
        <ListItem key={"subtotal"} disablePadding>
          <ListItemText primary={"Subtotal:"} sx={styles.totals} />
          <ListItemText
            primary={"$" + cartHandler.totals.totalPrice}
            sx={styles.totals}
          />
        </ListItem>
        {tax && (
          <ListItem key={"tax"} disablePadding>
            <ListItemText primary={"Est. Tax:"} sx={styles.totals} />
            <ListItemText primary={"$" + estimatedTax} sx={styles.totals} />
          </ListItem>
        )}
        {shippingCost !== undefined && (
          <ListItem key={"shipping"} disablePadding>
            <ListItemText primary={"Shipping:"} sx={styles.totals} />
            <ListItemText
              primary={"$" + shippingCost.toFixed(2)}
              sx={styles.totals}
            />
          </ListItem>
        )}
        {total && (
          <>
            <Divider />
            <ListItem key={"total"} disablePadding>
              <ListItemText primary={"Total:"} sx={styles.totals} />
              <ListItemText
                primary={"$" + totalCharge.toFixed(2)}
                sx={styles.totals}
              />
            </ListItem>
          </>
        )}
      </List>
    </>
  );
}
