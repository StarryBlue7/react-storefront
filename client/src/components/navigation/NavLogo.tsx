import React from "react";

import { Box, Typography } from "@mui/material";

import squirrelCart from "../../images/squirrelCart50x30.svg";

const appName = "Ca$hew";

function NavLogo() {
  return (
    <>
      {/* Desktop logo */}
      <Box sx={{ display: { xs: "none", md: "flex" }, mx: 1 }}>
        <img src={squirrelCart} alt={"Acorn Shop"} />
      </Box>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "Merienda",
          fontWeight: 700,
          // letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {appName}
      </Typography>

      {/* Mobile/tablet logo */}
      <Box sx={{ display: { xs: "flex", md: "none" }, mx: 1 }}>
        <img src={squirrelCart} alt={"Acorn Shop"} />
      </Box>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "Merienda",
          fontWeight: 700,
          // letterSpacing: ".3rem",
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
