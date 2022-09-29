import React from "react";
// import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
// import ResponsiveSidebar from "./components/ResponsiveSidebar";
import CategoriesDrawer from "./components/CategoriesDrawer";
import CartDrawer from "./components/CartDrawer";
import ProductsResults from "./components/ProductsResults";

// const styles = {
//   main: {
//     display: "flex",
//     flexFlow: "column",
//     gap: 10,
//   },
// };

type DrawerState = { categories: boolean; cart: boolean };
type Drawer = "categories" | "cart";

function Main() {
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

  return (
    <>
      {/* <Container style={styles.main} fixed> */}
      <NavBar toggleDrawers={toggleDrawers} />
      <CategoriesDrawer
        open={drawers.categories}
        toggleDrawers={toggleDrawers}
      />
      <CartDrawer open={drawers.cart} toggleDrawers={toggleDrawers} />
      <ProductsResults products={[1, 2, 3]} />
      {/* </Container> */}
    </>
  );
}

export default Main;
