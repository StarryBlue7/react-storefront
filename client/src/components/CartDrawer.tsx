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
import MailIcon from "@mui/icons-material/Mail";

export default function CartDrawer({ open, toggleDrawers }: any) {
  return (
    <>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={toggleDrawers("cart", false)}
      >
        <Box
          sx={{
            width: 250,
          }}
          role="presentation"
          onClick={toggleDrawers("cart", false)}
          onKeyDown={toggleDrawers("cart", false)}
        >
          <List>
            {["1", "2", "3", "4"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={"Item " + text} />
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
