import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";

import { ExpandLess, ExpandMore } from "@mui/icons-material";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../utils/queries";
import { NavLink } from "react-router-dom";

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

type Props = {
  categoryStates: CategoryStates;
  category: Category;
  autoOpen?: number;
  layer?: number;
};

export default function CategoryTree({
  categoryStates,
  category,
  autoOpen = 1,
  layer = 1,
}: Props) {
  const [open, setOpen] = React.useState<boolean>(autoOpen >= layer);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem key={category.name} disablePadding>
        <ListItemButton
          sx={{ flexGrow: 1 }}
          onClick={categoryStates.selectCategory(category._id)}
        >
          <ListItemText primary={category.name} />
        </ListItemButton>
        {category?.subCategories && category?.subCategories.length > 0 && (
          <ListItemButton onClick={handleClick} sx={{ flexGrow: 0 }}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        )}
      </ListItem>
      {category?.subCategories && category?.subCategories.length > 0 && (
        <Collapse in={open}>
          <List sx={{ pl: 2 }}>
            {category?.subCategories &&
              category?.subCategories.map((subcategory: any) => (
                <CategoryTree
                  category={subcategory}
                  categoryStates={categoryStates}
                  autoOpen={autoOpen}
                  layer={layer + 1}
                />
              ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
