import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { urlString } from "../../utils/url";

type Category = {
  _id: string;
  name: string;
  parentCategory?: string;
  subCategories?: Array<Category>;
};

type Props = {
  category: Category;
  autoOpen?: number;
  layer?: number;
};

/**
 * Recursively generates collapsible lists of subcategories from parent
 */
export default function CategoryTree({
  category,
  autoOpen = 1,
  layer = 1,
}: Props) {
  // Sublist collapsing state, initially set dependent on autoOpen value and current layer
  const [subList, setSubList] = React.useState<boolean>(autoOpen >= layer);
  const toggleSubList = () => {
    setSubList(!subList);
  };

  return (
    <>
      <ListItem key={category.name} disablePadding>
        <Link
          to={`/category/${category._id}/${urlString(category.name)}`}
          style={{ flexGrow: 1, textDecoration: "none" }}
        >
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{ color: "text.primary" }}
              primary={category.name}
            />
          </ListItemButton>
        </Link>
        {category?.subCategories && category.subCategories.length > 0 && (
          <ListItemButton onClick={toggleSubList} sx={{ flexGrow: 0 }}>
            {subList ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        )}
      </ListItem>
      {category?.subCategories && category.subCategories.length > 0 && (
        <Collapse in={subList}>
          <List sx={{ pl: 2 }}>
            {category?.subCategories &&
              category.subCategories.map((subcategory: Category) => (
                <CategoryTree
                  category={subcategory}
                  autoOpen={autoOpen}
                  layer={layer + 1}
                  key={subcategory.name}
                />
              ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
