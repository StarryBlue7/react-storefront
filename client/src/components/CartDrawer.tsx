import React from "react";
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  ShoppingCartCheckout,
  RemoveShoppingCartOutlined,
} from "@mui/icons-material";

import CartItem from "./CartItem";

const styles = {
  totals: { textAlign: "right", width: "50%" },
  cartButton: { flexGrow: 1 },
  cartButtonIcon: { minWidth: 0, mr: 1 },
};

export default function CartDrawer({ open, toggleDrawers, cartHandler }: any) {
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
          <Typography variant="h5" sx={{ px: 2, pt: 2 }}>
            Shopping Cart
            {cartHandler.cart.length > 0
              ? ` (${cartHandler.totals.totalQty})`
              : ""}
          </Typography>
          <List sx={{ minHeight: "40vh" }}>
            {cartHandler.cart.map((item: any) => (
              <CartItem
                item={item}
                cartHandler={cartHandler}
                key={item.product._id}
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
            <ListItem
              key={"cart-options"}
              sx={{ display: "flex", flexFlow: "row wrap", gap: 1 }}
            >
              <Button
                onClick={cartHandler.clearAll()}
                variant="outlined"
                sx={styles.cartButton}
              >
                <ListItemIcon sx={styles.cartButtonIcon}>
                  <RemoveShoppingCartOutlined />
                </ListItemIcon>
                <ListItemText primary={"Empty Cart"} />
              </Button>
              <Button variant="contained" sx={styles.cartButton}>
                <ListItemIcon sx={styles.cartButtonIcon}>
                  <ShoppingCartCheckout sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"Checkout"} />
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
