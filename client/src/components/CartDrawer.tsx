import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Typography } from "@mui/material";
// import MailIcon from "@mui/icons-material/Mail";

const styles = {
  cartImg: {
    height: 50,
    width: 50,
    objectFit: "cover",
  },
} as React.CSSProperties | any;

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
            width: 300,
          }}
          role="presentation"
          onClick={toggleDrawers("cart", false)}
          onKeyDown={toggleDrawers("cart", false)}
        >
          <Typography variant="h5" sx={{ px: 2, pt: 2 }}>
            Shopping Cart
          </Typography>
          <List sx={{ minHeight: "40vh" }}>
            {cartHandler.cart.map((item: any) => (
              <ListItem key={item.product._id} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={item.product.imgURL}
                      alt={item.product.shortName}
                      style={styles.cartImg}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.product.shortName}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                      flexGrow: 0,
                      pl: 1,
                    }}
                  />
                  <ListItemText
                    primary={"x" + item.quantity}
                    sx={{ flexGrow: 1, textAlign: "right" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem key={"total"}>
              <ListItemText primary={"Subtotal: " + 8} />
            </ListItem>
            <ListItem key={"checkout"}>
              <Button variant="contained">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Checkout"} />
              </Button>
            </ListItem>
            <ListItem key={"clear-cart"}>
              <Button variant="outlined">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Empty Cart"} />
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
