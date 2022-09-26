import React from "react";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
import CategoryDrawer from "./components/CategoryDrawer";

const styles = {
  main: {
    display: "flex",
    flexFlow: "column",
    gap: 10,
  },
};

function Main() {
  return (
    <Container style={styles.main} fixed>
      <CategoryDrawer />
    </Container>
  );
}

export default Main;
