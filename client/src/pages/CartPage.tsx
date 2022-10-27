import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

/**
 * Cart page
 */
export default function CartPage({ cartHandler }: any) {
  return (
    <>
      {cartHandler.cart.map((item: any) => (
        <CartItem
          item={item}
          cartHandler={cartHandler}
          key={item.product._id}
        />
      ))}
      <Link to="checkout">
        <Button variant="contained">Proceed to Checkout</Button>
      </Link>
    </>
  );
}
