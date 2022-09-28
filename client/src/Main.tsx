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
  return (
    <>
      {/* <Container style={styles.main} fixed> */}
      <NavBar />
      {/* </Container> */}
    </>
  );
}

export default Main;
