import React from "react";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
import ResponsiveSidebar from "./components/ResponsiveSidebar";
import CategoriesDrawer from "./components/CategoriesDrawer";

const styles = {
  main: {
    display: "flex",
    flexFlow: "column",
    gap: 10,
  },
};

function Main() {
  const [categoryDrawer, setCategoryDrawer] = React.useState<boolean>(false);

  const handleOpenNavMenu = (): void => {
    console.log("open");
    setCategoryDrawer(true);
  };
  const handleCloseNavMenu = () => {
    console.log("close");
    setCategoryDrawer(false);
  };

  return (
    <>
      {/* <Container style={styles.main} fixed> */}
      <NavBar handleOpenNavMenu={handleOpenNavMenu} />
      <CategoriesDrawer
        open={categoryDrawer}
        handleCloseNavMenu={handleCloseNavMenu}
      />
      {/* </Container> */}
    </>
  );
}

export default Main;
