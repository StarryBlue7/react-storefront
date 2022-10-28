import React from "react";
import {
  List,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import CartItem from "./CartItem";

const styles = {
  totals: { textAlign: "right", width: "50%" },
  links: { textDecoration: "none", flexGrow: 1 },
  cartButton: { width: "100%" },
  cartButtonIcon: { minWidth: 0, mr: 1 },
};

export default function Cart({
  cartHandler,
  disable = false,
  label = "Shopping Cart",
}: any) {
  return (
    <>
      <Typography variant="h5" sx={{ px: 2, pt: 2 }}>
        {label}
        {cartHandler.cart.length > 0 ? ` (${cartHandler.totals.totalQty})` : ""}
      </Typography>
      <List sx={{ minHeight: "40vh" }}>
        {cartHandler.cart.map((item: any) => (
          <CartItem
            item={item}
            cartHandler={cartHandler}
            key={item.product._id}
            disable={disable}
          />
        ))}
      </List>
      <Divider />
      <List>
        <ListItem key={"total-items"}>
          <ListItemText primary={"Items:"} sx={styles.totals} />
          <ListItemText
            primary={cartHandler.totals.totalQty}
            sx={styles.totals}
          />
        </ListItem>
        <ListItem key={"subtotal"}>
          <ListItemText primary={"Subtotal:"} sx={styles.totals} />
          <ListItemText
            primary={"$" + cartHandler.totals.totalPrice}
            sx={styles.totals}
          />
        </ListItem>
      </List>
    </>
  );
}
