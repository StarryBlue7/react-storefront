import React from "react";
import CartItem from "../components/CartItem";
import CheckoutForm from "../components/CheckoutForm";
import StripeWrapper from "../components/StripeWrapper";

/**
 * Cart page
 */
export default function CheckoutPage({ cartHandler }: any) {
  return (
    <>
      {cartHandler.cart.map((item: any) => (
        <CartItem
          item={item}
          cartHandler={cartHandler}
          key={item.product._id}
        />
      ))}
      <StripeWrapper cart={cartHandler.cart}>
        <CheckoutForm />
      </StripeWrapper>
    </>
  );
}
