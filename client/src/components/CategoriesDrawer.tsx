import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";
import { NavLink } from "react-router-dom";
import CategoryTree from "./CategoryTree";

type Category = {
  _id: string;
  name: string;
  parentCategory?: string;
  subCategories?: Array<Category>;
};

type CategoryStates = {
  selectedCategory: string;
  selectCategory: Function;
};

type Page = {
  label: string;
  path: string;
};

type Props = {
  mainPages: Page[];
  open: boolean;
  toggleDrawers: Function;
  categoryStates: CategoryStates;
};

export default function CategoriesDrawer({
  mainPages,
  open,
  toggleDrawers,
  categoryStates,
}: Props) {
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
          // onKeyDown={toggleDrawers("categories", false)}
        >
          <List
            onClick={toggleDrawers("categories", false)}
            sx={{
              display: { sm: "flex", md: "none" },
              flexDirection: "column",
            }}
          >
            <NavLink to={"/"} style={{ textDecoration: "none" }}>
              <ListItem
                onClick={categoryStates.selectCategory("")}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>
            </NavLink>
            {mainPages.map((page, index) => (
              <NavLink
                to={page.path}
                style={{ textDecoration: "none" }}
                key={page.label}
              >
                <ListItem
                  onClick={categoryStates.selectCategory("")}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={page.label} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          <List>
            {categories.map((category: Category) => (
              <CategoryTree
                category={category}
                categoryStates={categoryStates}
              />
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
