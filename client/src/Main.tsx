import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import { Discount, NewReleases } from "@mui/icons-material";

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

type DrawerState = { categories: boolean; cart: boolean };
type Drawer = "categories" | "cart";

type SelectedTags = Set<string>;
type SelectedCategory = string;

type Product = {
  _id: string;
  imgURL: string;
  fullName: string;
  shortName: string;
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
  // Login/signup modal control
  const [authOpen, setAuthOpen] = React.useState<boolean>(false);
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
  const [drawers, setDrawers] = React.useState<DrawerState>({
    categories: false,
    cart: false,
  });
  const toggleDrawers =
    (drawer: Drawer, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawers((prev) => {
        return { ...prev, [drawer]: open };
      });
    };

  // User account cart data retrieval
  const [fetchCart, { loading: cartLoading, data: cartData }] =
    useLazyQuery(QUERY_CART);
  const [updateAccountCart] = useMutation(UPDATE_CART);

  const loggedIn = Auth.loggedIn();
  const accountCart = React.useMemo(() => cartData?.me?.cart || [], [cartData]);

  const [cart, setCart] = React.useState<CartState>(CartHandler.getLocal());

  // Use account cart if local cart empty
  React.useEffect(() => {
    async function retrieveCart() {
      if (loggedIn) {
        await fetchCart();
        if (CartHandler.getLocal().length === 0) {
          setCart(accountCart);
        }
      }
    }
    retrieveCart();
  }, [loggedIn, accountCart, fetchCart]);

  // Keep local & account carts updated to app cart state
  React.useEffect(() => {
    // Update account cart in db if logged in
    async function refreshAccountCart() {
      if (loggedIn) {
        const newCart = cart.map((item: Item) => {
          return { product: item.product._id, quantity: item.quantity };
        });
        await updateAccountCart({ variables: { cart: newCart } });
        await fetchCart();
      }
    }
    refreshAccountCart();
    // Update local storage cart
    CartHandler.setLocal(cart);
  }, [cart, loggedIn, fetchCart, updateAccountCart]);

  // Cart handling functions & states for passing as props
  const cartHandler = {
    cartLoading,
    cart,
    totals: React.useMemo(() => CartHandler.getTotals(cart), [cart]),
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

  // Product tags selection
  const [selectedTags, setSelectedTags] = React.useState<SelectedTags>(
    new Set()
  );
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

  // Category selection
  const [selectedCategory, setSelectedCategory] =
    React.useState<SelectedCategory>("");
  const categoryStates = {
    selectedCategory,
    selectCategory: (category: string) => () => setSelectedCategory(category),
  };

  // Close drawers on category or page change
  const location = useLocation();
  React.useEffect(() => {
    setDrawers({
      categories: false,
      cart: false,
    });
  }, [selectedCategory, location]);

  return (
    <>
      <NavBar
        mainPages={mainPages}
        accountPages={accountPages}
        toggleDrawers={toggleDrawers}
        modalStates={modalStates}
        cartHandler={cartHandler}
        location={location}
      />
      <AuthModal modalStates={modalStates} />
      <CategoriesDrawer
        mainPages={mainPages}
        open={drawers.categories}
        toggleDrawers={toggleDrawers}
        categoryStates={categoryStates}
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
            element={
              <Home
                tagStates={tagStates}
                categoryStates={categoryStates}
                cartHandler={cartHandler}
              />
            }
          />
          <Route
            path="/products/:productId"
            element={<ProductPage cartHandler={cartHandler} />}
          />
          <Route
            path="/cart"
            element={<CartPage cartHandler={cartHandler} />}
          />
          <Route
            path="/cart/checkout"
            element={<CheckoutPage cartHandler={cartHandler} />}
          />
          <Route path="*" element={<h1>Page not found!</h1>} />
          <Route
            path="/success"
            element={<SuccessPage cartHandler={cartHandler} />}
          />
        </Routes>
        {location.pathname.substring(0, 5) !== "/cart" && (
          <CartButton toggleDrawers={toggleDrawers} cartHandler={cartHandler} />
        )}
      </Container>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        limit={3}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Main;
