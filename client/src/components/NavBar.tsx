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
  ShoppingBasketOutlined,
  AccountCircle,
  Menu as MenuIcon,
  Login,
} from "@mui/icons-material";

import Auth from "../utils/auth";
import NavLogo from "./NavLogo";
import { NavLink } from "react-router-dom";

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

type NavBarProps = {
  mainPages: Page[];
  accountPages: Page[];
  toggleDrawers: Function;
  modalStates: ModalStates;
  location: Location;
};

function NavBar({
  mainPages,
  accountPages,
  toggleDrawers,
  modalStates,
  location,
}: NavBarProps) {
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
                    sx={{ p: 0 }}
                  >
                    <ShoppingBasketOutlined
                      sx={{
                        display: { xs: "flex", md: "flex" },
                        mr: 1,
                        color: "white",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              )}
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
                    <MenuItem onClick={Auth.logout}>
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
