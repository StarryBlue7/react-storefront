import React from "react";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
import ResponsiveSidebar from "./components/ResponsiveSidebar";
import CategoriesDrawer from "./components/CategoriesDrawer";
import CartDrawer from "./components/CartDrawer";

const styles = {
  main: {
    display: "flex",
    flexFlow: "column",
    gap: 10,
  },
};

type Drawers = { categories: boolean; cart: boolean };

function Main() {
  const [drawers, setDrawers] = React.useState<Drawers>({
    categories: false,
    cart: false,
  });
  const [categoryDrawer, setCategoryDrawer] = React.useState<boolean>(false);
  const handleOpenNavMenu = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setCategoryDrawer(true);
  };
  const handleCloseNavMenu = (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setCategoryDrawer(false);
  };

  const [cartDrawer, setCartDrawer] = React.useState<boolean>(false);
  const handleOpenCart = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setCartDrawer(true);
  };
  const handleCloseCart = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setCartDrawer(false);
  };

  return (
    <>
      {/* <Container style={styles.main} fixed> */}
      <NavBar
        handleOpenNavMenu={handleOpenNavMenu}
        handleOpenCart={handleOpenCart}
      />
      <CategoriesDrawer
        open={categoryDrawer}
        handleCloseNavMenu={handleCloseNavMenu}
      />
      <CartDrawer open={cartDrawer} handleCloseCart={handleCloseCart} />
      {/* </Container> */}
    </>
  );
}

export default Main;
