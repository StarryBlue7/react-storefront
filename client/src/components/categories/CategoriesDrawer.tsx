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
  Typography,
} from "@mui/material";

import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { NavLink } from "react-router-dom";
import CategoryTree from "./CategoryTree";
import { Home } from "@mui/icons-material";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import Loader from "../feedback/Loader";

type Category = {
  _id: string;
  name: string;
  parentCategory?: string;
  subCategories?: Array<Category>;
};

type Page = {
  label: string;
  path: string;
  icon: ReactJSXElement;
};

type Props = {
  mainPages: Page[];
  open: boolean;
  toggleDrawers: Function;
};

const styles = {
  pageIcon: {
    pr: 2,
    minWidth: 0,
  },
};

/**
 * Sidebar listing category trees, also lists shop pages in mobile/tablet view
 */
export default function CategoriesDrawer({
  mainPages,
  open,
  toggleDrawers,
}: Props) {
  // Retrieve category root nodes with populated child nodes
  const { loading, data } = useQuery(QUERY_CATEGORIES, {
    fetchPolicy: "cache-first",
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
        >
          <List
            onClick={toggleDrawers("categories", false)}
            sx={{
              display: { sm: "flex", md: "none" },
              flexDirection: "column",
            }}
          >
            <NavLink to={"/"} style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={styles.pageIcon}>
                    <Home />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Home"}
                    primaryTypographyProps={{ color: "text.primary" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            {mainPages.map((page) => (
              <NavLink
                to={page.path}
                style={{ textDecoration: "none" }}
                key={page.label}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={styles.pageIcon}>
                      {page.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={page.label}
                      primaryTypographyProps={{ color: "text.primary" }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          <Typography variant="h5" sx={{ px: 2, pt: 2 }}>
            Shop Categories
          </Typography>
          {loading ? (
            <Loader message="Loading categories..." />
          ) : (
            <List>
              {categories.map((category: Category) => (
                <CategoryTree category={category} key={category.name} />
              ))}
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
}
