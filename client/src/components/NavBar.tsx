import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import {
  ShoppingCartCheckout,
  ShoppingBasketOutlined,
  AccountCircle,
  Menu as MenuIcon,
  Login,
} from "@mui/icons-material";

import Auth from "../utils/auth";

function NavBar({ toggleDrawers, modalStates }: any) {
  // Page tabs
  const pages = ["Home", "Categories", "Sale"];
  // Account menu options
  const settings = ["Account", "Orders", "Wishlist"];

  // Account menu control
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container sx={{ maxWidth: { xl: "xl", lg: "lg" } }}>
          <Toolbar variant="dense" disableGutters>
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
              QuickShop
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawers("categories", true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
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
              QuickShop
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={toggleDrawers("categories", true)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              <Tooltip title="Open cart">
                <IconButton onClick={toggleDrawers("cart", true)} sx={{ p: 0 }}>
                  <ShoppingBasketOutlined
                    sx={{
                      display: { xs: "flex", md: "flex" },
                      mr: 1,
                      color: "white",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {Auth.loggedIn() ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <AccountCircle
                        sx={{
                          display: { xs: "flex", md: "flex" },
                          mr: 1,
                          color: "white",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <>
                  <Tooltip title="Login or signup">
                    <IconButton onClick={modalStates.openAuth}>
                      <Login
                        sx={{
                          display: { xs: "flex", md: "flex" },
                          mr: 1,
                          color: "white",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default NavBar;
