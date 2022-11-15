import React, {
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Container, Stack } from "@mui/material";
import { Discount, NewReleases } from "@mui/icons-material";

import { Routes, Route, useLocation } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Auth from "./utils/auth";
import CartHandler from "./utils/cartHandler";

import { useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_CART } from "./utils/queries";
import { UPDATE_CART } from "./utils/mutations";

import NavBar from "./components/navigation/NavBar";
import AuthModal from "./components/auth/AuthModal";
import CategoriesDrawer from "./components/categories/CategoriesDrawer";
import CartDrawer from "./components/cart/CartDrawer";
import CartButton from "./components/navigation/CartButton";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";

type DrawerState = { categories: boolean; cart: boolean };

type Drawer = "categories" | "cart";

type SelectedTags = Set<string>;

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

type CartState = Item[];

// Page tabs
const mainPages = [
  { label: "Sale", path: "/sale", icon: <Discount /> },
  { label: "New", path: "/new", icon: <NewReleases /> },
];
// Account menu options
const accountPages = [
  { label: "Account", path: "/account" },
  { label: "Orders", path: "/account/orders" },
  { label: "Wishlist", path: "/account/wishlist" },
];

function Main() {
  // Current page URL location
  const location = useLocation();

  // User authentication state control
  const [loggedIn, setLoggedIn] = useState<boolean>(Auth.loggedIn());
  const authHandler = {
    loggedIn,
    authRefresh: function () {
      setLoggedIn(Auth.loggedIn());
    },
    login: function (token: string) {
      Auth.login(token);
      setLoggedIn(Auth.loggedIn());
    },
    logout: function () {
      Auth.logout();
      setLoggedIn(Auth.loggedIn());
    },
  };

  // Login/signup modal control
  const [authOpen, setAuthOpen] = useState<boolean>(false);
  const modalStates = {
    authOpen,
    openAuth: () => {
      setAuthOpen(true);
    },
    closeAuth: () => {
      setAuthOpen(false);
    },
  };

  // Category & cart drawer display control
  const [drawers, setDrawers] = useState<DrawerState>({
    categories: false,
    cart: false,
  });
  const toggleDrawers =
    (drawer: Drawer, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawers((prev) => {
        return { ...prev, [drawer]: open };
      });
    };

  const [cart, setCart] = useState<CartState>(CartHandler.getLocal());

  // Database user account cart retrieval/update
  const [fetchCart, { loading: cartLoading }] = useLazyQuery(QUERY_CART, {
    fetchPolicy: "no-cache",
  });
  const [updateAccountCart] = useMutation(UPDATE_CART);

  // Cart handling functions & states for passing as props
  const cartHandler = {
    cartLoading,
    cart,
    totals: useMemo(() => CartHandler.getTotals(cart), [cart]),
    addToCart: (product: Product, quantity?: number) => () => {
      toast(`🛒 ${product.shortName} added to cart.`);
      setCart((prev: CartState) =>
        CartHandler.addItem(prev, product, quantity)
      );
    },
    updateQty: (productId: string, quantity: number) => () => {
      setCart((prev: CartState) =>
        CartHandler.updateQty(prev, productId, quantity)
      );
    },
    deleteItem: (productId: string) => () => {
      setCart((prev: CartState) => CartHandler.deleteItem(prev, productId));
    },
    updateCart: (cart: CartState) => () => {
      setCart(cart);
    },
    clearAll: () => () => {
      setCart(CartHandler.clearAll);
    },
  };

  // Use account cart if local cart empty, except on order success page
  useEffect(() => {
    async function retrieveCart() {
      if (loggedIn && location.pathname !== "/success") {
        try {
          const { data } = await fetchCart();
          const accountCart = data.me.cart;
          if (CartHandler.getLocal().length === 0 && accountCart.length > 0) {
            setCart(accountCart);
          }
        } catch (e: any) {
          console.error(e);
        }
      }
    }
    retrieveCart();
  }, [loggedIn, fetchCart]); // eslint-disable-line react-hooks/exhaustive-deps
  // location dependency ignored to prevent unnecessary cart fetching

  // Keep local & account carts updated to app cart state
  useEffect(() => {
    // Update account cart in db if logged in
    async function refreshAccountCart() {
      if (Auth.loggedIn()) {
        const newCart = cart.map((item: Item) => {
          return { product: item.product._id, quantity: item.quantity };
        });
        await updateAccountCart({
          variables: { cart: newCart },
        });
      }
    }
    refreshAccountCart();

    // Update local storage cart
    CartHandler.setLocal(cart);
  }, [cart, updateAccountCart]);

  // Product tags selection
  const [selectedTags, setSelectedTags] = useState<SelectedTags>(new Set());
  const tagStates = {
    selectedTags,
    toggleTag: (tag: string) => () => {
      let newTags = new Set(selectedTags);
      if (selectedTags.has(tag)) {
        newTags.delete(tag);
        setSelectedTags(newTags);
      } else {
        newTags.add(tag);
        setSelectedTags(newTags);
      }
    },
  };

  // Close drawers on category or page change
  useEffect(() => {
    setDrawers({
      categories: false,
      cart: false,
    });
  }, [location, loggedIn]);

  return (
    <Stack style={{ minHeight: "100vh" }}>
      <NavBar
        mainPages={mainPages}
        accountPages={accountPages}
        toggleDrawers={toggleDrawers}
        modalStates={modalStates}
        cartHandler={cartHandler}
        authHandler={authHandler}
        location={location}
      />
      <AuthModal modalStates={modalStates} authHandler={authHandler} />
      <CategoriesDrawer
        mainPages={mainPages}
        open={drawers.categories}
        toggleDrawers={toggleDrawers}
      />
      <CartDrawer
        open={drawers.cart}
        toggleDrawers={toggleDrawers}
        cartHandler={cartHandler}
      />
      <Container
        sx={{
          maxWidth: { xl: "xl", lg: "lg" },
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<Home tagStates={tagStates} cartHandler={cartHandler} />}
          />
          <Route
            path="/category/:categoryId/*"
            element={
              <CategoryPage tagStates={tagStates} cartHandler={cartHandler} />
            }
          />
          <Route
            path="/product/:productId/*"
            element={<ProductPage cartHandler={cartHandler} />}
          />
          <Route
            path="/cart"
            element={<CartPage cartHandler={cartHandler} />}
          />
          <Route
            path="/cart/checkout"
            element={
              <CheckoutPage
                cartHandler={cartHandler}
                authHandler={authHandler}
              />
            }
          />
          <Route
            path="/success"
            element={<SuccessPage cartHandler={cartHandler} />}
          />
          <Route path="*" element={<h1>Page not found!</h1>} />
        </Routes>
        {location.pathname.substring(0, 5) !== "/cart" && (
          <CartButton toggleDrawers={toggleDrawers} cartHandler={cartHandler} />
        )}
      </Container>
      <Footer />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        limit={3}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Stack>
  );
}

export default Main;
