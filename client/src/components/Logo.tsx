import React from "react";

import { Box, Typography } from "@mui/material";

import squirrelCart from "../images/squirrelCart50x30.svg";

const appName = "Ca$hew";

type LogoProps = {
  vertical?: boolean;
  large?: boolean;
};

export default function Logo({ vertical = false, large = false }: LogoProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: vertical ? "column" : "row",
        }}
      >
        {/* Desktop logo */}
        <Box sx={{ display: { xs: "none", md: "flex" }, mx: 1 }}>
          <img src={squirrelCart} alt={appName} width={large ? 100 : 50} />
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          align="center"
          sx={{
            display: { xs: "none", md: "block" },
            fontFamily: "Merienda",
            fontWeight: 700,
            textAlign: "center",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {appName}
        </Typography>

        {/* Mobile/tablet logo */}
        <Box sx={{ display: { xs: "flex", md: "none" }, mx: 1 }}>
          <img src={squirrelCart} alt={appName} width={large ? "100%" : 50} />
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "Merienda",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {appName}
        </Typography>
      </Box>
    </>
  );
}
