import React, { MouseEvent, useEffect, useState } from "react";

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
  Badge,
} from "@mui/material";
import {
  ShoppingBasketOutlined,
  AccountCircle,
  Menu as MenuIcon,
  Login,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

import NavLogo from "./NavLogo";

type Page = {
  label: string;
  path: string;
};

type ModalStates = {
  authOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
};

type Location = {
  pathname: string;
  search: string;
};

type Tag = {
  _id: string;
  name: string;
};

type Product = {
  _id: string;
  fullName: string;
  shortName: string;
  modelNumber: string;
  imgURL: string;
  description: string;
  rating?: number;
  tags: Tag[];
  price: number;
};

type Item = {
  product: Product;
  quantity: number;
};

type Totals = {
  totalPrice: number;
  totalQty: number;
};

type CartHandler = {
  cartLoading: boolean;
  cart: Item[];
  totals: Totals;
  addToCart: (product: Product, quantity?: number) => () => void;
  updateQty: (productId: string, quantity: number) => () => void;
  deleteItem: (productId: string) => () => void;
  updateCart: (cart: Item[]) => () => void;
  clearAll: () => () => void;
};

type AuthHandler = {
  loggedIn: boolean;
  authRefresh: () => void;
  login: (token: string) => void;
  logout: () => void;
};

type NavBarProps = {
  mainPages: Page[];
  accountPages: Page[];
  toggleDrawers: Function;
  modalStates: ModalStates;
  authHandler: AuthHandler;
  cartHandler?: CartHandler;
  location: Location;
};

function NavBar({
  mainPages,
  accountPages,
  toggleDrawers,
  modalStates,
  cartHandler,
  authHandler,
  location,
}: NavBarProps) {
  // Account menu control
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setAnchorElUser(null);
  }, [authHandler.loggedIn]);

  return (
    <>
      <AppBar position="sticky">
        <Container sx={{ maxWidth: { xl: "xl", lg: "lg" } }}>
          <Toolbar variant="dense" disableGutters>
            {/* Hamburger menu for mobile/tablet */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="main menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawers("categories", true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logo */}
            <NavLogo />

            {/* Page tabs */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                  }}
                >
                  Home
                </Button>
              </NavLink>
              <Button
                onClick={toggleDrawers("categories", true)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
              >
                Categories
              </Button>
              {mainPages.map((page) => (
                <NavLink
                  key={page.label}
                  to={page.path}
                  style={{ textDecoration: "none" }}
                >
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    {page.label}
                  </Button>
                </NavLink>
              ))}
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              {location.pathname.substring(0, 5) !== "/cart" && (
                <Tooltip title="Open cart">
                  <IconButton
                    onClick={toggleDrawers("cart", true)}
                    sx={{ pr: 1 }}
                  >
                    {/* Cart item qty badge on cart icon */}
                    <Badge
                      badgeContent={cartHandler?.totals.totalQty}
                      color="secondary"
                      overlap="circular"
                    >
                      <ShoppingBasketOutlined
                        sx={{
                          display: { xs: "flex", md: "flex" },
                          mr: 1,
                          color: "white",
                        }}
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {authHandler.loggedIn ? (
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
                    {accountPages.map((option) => (
                      <NavLink
                        to={option.path}
                        style={{ textDecoration: "none" }}
                        key={option.label}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center" color="primary">
                            {option.label}
                          </Typography>
                        </MenuItem>
                      </NavLink>
                    ))}
                    <MenuItem onClick={authHandler.logout}>
                      <Typography textAlign="center" color="primary">
                        Logout
                      </Typography>
                    </MenuItem>
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
