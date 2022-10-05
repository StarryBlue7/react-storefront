import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
// import ResponsiveSidebar from "./components/ResponsiveSidebar";
import CategoriesDrawer from "./components/CategoriesDrawer";
import CartDrawer from "./components/CartDrawer";
import CartButton from "./components/CartButton";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";

type DrawerState = { categories: boolean; cart: boolean };
type Drawer = "categories" | "cart";
type SelectedTags = Set<string>;
type SelectedCategory = string;

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

  // Category selection
  const [selectedCategory, setSelectedCategory] =
    React.useState<SelectedCategory>("");
  const categoryStates = {
    selectedCategory,
    selectCategory: (category: string) => () => setSelectedCategory(category),
  };

  return (
    <Router>
      <NavBar toggleDrawers={toggleDrawers} />
      <CategoriesDrawer
        open={drawers.categories}
        toggleDrawers={toggleDrawers}
        categoryStates={categoryStates}
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
        <Routes>
          <Route
            path="/"
            element={
              <Home tagStates={tagStates} categoryStates={categoryStates} />
            }
          />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="*" element={<h1>Page not found!</h1>} />
        </Routes>
        <CartButton toggleDrawers={toggleDrawers} />
      </Container>
    </Router>
  );
}

export default Main;
