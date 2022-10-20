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
            width: { xs: 275, sm: 350, md: 400 },
          }}
          role="presentation"
        >
          <Typography variant="h5" sx={{ px: 2, pt: 2 }}>
            Shopping Cart
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
            <ListItem key={"total"}>
              <ListItemText primary={"Subtotal: " + 8} />
            </ListItem>
            <ListItem key={"cart-options"}>
              <Button onClick={cartHandler.clearAll()} variant="outlined">
                <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                  <RemoveShoppingCartOutlined />
                </ListItemIcon>
                <ListItemText primary={"Empty Cart"} />
              </Button>
              <Button variant="contained">
                <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                  <ShoppingCartCheckout />
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
