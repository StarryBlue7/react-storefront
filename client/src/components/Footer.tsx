import React from "react";

import { AppBar, Typography, Container, Grid, Divider } from "@mui/material";

import NavLogo from "./navigation/NavLogo";

const footerSections = [
  { header: "About Us", links: [{ label: "Company", path: "" }] },
  {
    header: "Contact",
    links: [
      { label: "Support", path: "" },
      { label: "Facebook", path: "" },
      { label: "Twitter", path: "" },
    ],
  },
  {
    header: "Legal",
    links: [
      { label: "Privacy Policy", path: "" },
      { label: "Cookies", path: "" },
    ],
  },
];

export default function Footer() {
  return (
    <>
      <AppBar
        position="relative"
        color="primary"
        sx={{ top: "auto", bottom: 0 }}
      >
        <Container sx={{ maxWidth: { xl: "xl", lg: "lg" }, py: 5 }}>
          <Grid container columns={15} columnGap={1}>
            <Grid
              item
              md={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NavLogo />
            </Grid>

            {footerSections.map((section) => (
              <Grid item md={3}>
                <Typography variant="body1" fontWeight="bold">
                  {section.header}
                </Typography>
                <Divider sx={{ bgcolor: "white" }} />
                {section.links.map((link) => (
                  <>
                    <Typography
                      component="a"
                      href="/"
                      variant="body2"
                      color="inherit"
                      display="block"
                      sx={{ textDecoration: "none" }}
                    >
                      {link.label}
                    </Typography>
                  </>
                ))}
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <Typography variant="body2">
              Copyright © 2022 - All right reserved
            </Typography>
          </Grid>
        </Container>
      </AppBar>
    </>
  );
}
