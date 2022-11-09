import React from "react";

import { Typography } from "@mui/material";
import { ShoppingCartCheckout } from "@mui/icons-material";

const appName = "QuickShop";

function NavLogo() {
  return (
    <>
      {/* Desktop logo */}
      <ShoppingCartCheckout
        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
      />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {appName}
      </Typography>

      {/* Mobile/tablet logo */}
      <ShoppingCartCheckout
        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
      />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {appName}
      </Typography>
    </>
  );
}

export default NavLogo;
