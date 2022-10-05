import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";

interface Category {
  _id: string;
  name: string;
  parentCategory?: string;
  subCategories?: string;
}

export default function CategoriesDrawer({ open, toggleDrawers }: any) {
  const { data } = useQuery(QUERY_CATEGORIES, {
    fetchPolicy: "no-cache",
  });

  const categories = data?.categories || [];

  return (
    <>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={toggleDrawers("categories", false)}
      >
        <Box
          sx={{
            width: 250,
          }}
          role="presentation"
          onClick={toggleDrawers("categories", false)}
          onKeyDown={toggleDrawers("categories", false)}
        >
          <List>
            {["Home", "Sale"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {categories.map((category: Category) => (
              <ListItem key={category.name} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={category.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
