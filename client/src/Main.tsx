import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { Discount, NewReleases } from "@mui/icons-material";

import NavBar from "./components/NavBar";
import AuthModal from "./components/AuthModal";
import CategoriesDrawer from "./components/CategoriesDrawer";
import CartDrawer from "./components/CartDrawer";
import CartButton from "./components/CartButton";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";

import Auth from "./utils/auth";
import Cart from "./utils/cartHandler";

import { useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_CART } from "./utils/queries";
import { UPDATE_CART } from "./utils/mutations";

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

  const [cart, setCart] = React.useState<CartState>(Cart.getLocal());

  // Use account cart if local cart empty
  React.useEffect(() => {
    async function retrieveCart() {
      if (loggedIn) {
        await fetchCart();
        if (Cart.getLocal().length === 0) {
          setCart(accountCart);
        }
      }
    }
    retrieveCart();
  }, [loggedIn, accountCart, fetchCart]);

  // Keep local & account carts updated to app cart state
  React.useEffect(() => {
    console.log("cart state", cart);
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
    Cart.setLocal(cart);
  }, [cart, loggedIn, fetchCart, updateAccountCart]);

  // Cart handling functions & states for passing as props
  const cartHandler = {
    cartLoading,
    cart,
    totals: React.useMemo(() => Cart.getTotals(cart), [cart]),
    addToCart: (product: Product, quantity?: number) => () => {
      setCart((prev: CartState) => Cart.addItem(prev, product, quantity));
    },
    updateQty: (productId: string, quantity: number) => () => {
      setCart((prev: CartState) => Cart.updateQty(prev, productId, quantity));
    },
    deleteItem: (productId: string) => () => {
      setCart((prev: CartState) => Cart.deleteItem(prev, productId));
    },
    updateCart: (cart: CartState) => () => {
      setCart(cart);
    },
    clearAll: () => () => {
      setCart(Cart.clearAll);
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

  // Close drawers on category change
  React.useEffect(() => {
    setDrawers({
      categories: false,
      cart: false,
    });
  }, [selectedCategory]);

  return (
    <Router>
      <NavBar
        mainPages={mainPages}
        accountPages={accountPages}
        toggleDrawers={toggleDrawers}
        modalStates={modalStates}
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
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="*" element={<h1>Page not found!</h1>} />
        </Routes>
        <CartButton toggleDrawers={toggleDrawers} />
      </Container>
    </Router>
  );
}

export default Main;
