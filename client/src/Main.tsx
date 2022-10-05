import React from "react";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
// import ResponsiveSidebar from "./components/ResponsiveSidebar";
import CategoriesDrawer from "./components/CategoriesDrawer";
import CartDrawer from "./components/CartDrawer";

import Home from "./pages/Home";
import CartButton from "./components/CartButton";

type DrawerState = { categories: boolean; cart: boolean };
type Drawer = "categories" | "cart";
type SelectedTags = Set<string>;

function Main() {
  // Category & cart drawer display control
  const [drawers, setDrawers] = React.useState<DrawerState>({
    categories: false,
    cart: false,
  });

  const toggleDrawers =
    (drawer: Drawer, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawers({ ...drawers, [drawer]: open });
    };

  // Product tags selection
  const [selectedTags, setSelectedTags] = React.useState<SelectedTags>(
    new Set()
  );
  const tagStates = {
    selectedTags,
    toggleTag: (tag: string) => () => {
      let newTags = new Set(selectedTags);
      if (selectedTags.has(tag)) {
        newTags.delete(tag);
        setSelectedTags(newTags);
      } else {
        newTags.add(tag);
        setSelectedTags(newTags);
      }
    },
  };

  return (
    <>
      <NavBar toggleDrawers={toggleDrawers} />
      <CategoriesDrawer
        open={drawers.categories}
        toggleDrawers={toggleDrawers}
      />
      <CartDrawer open={drawers.cart} toggleDrawers={toggleDrawers} />
      <Container
        sx={{
          maxWidth: { xl: "xl", lg: "lg" },
          display: "flex",
          flexFlow: "column",
          gap: 1,
        }}
      >
        <Home tagStates={tagStates} />
        <CartButton toggleDrawers={toggleDrawers} />
      </Container>
    </>
  );
}

export default Main;
