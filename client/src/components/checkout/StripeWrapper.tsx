import React, { ReactNode, useEffect, useMemo, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useLazyQuery } from "@apollo/client";
import { QUERY_PAYMENT_INTENT } from "../../utils/queries";

import Loader from "../feedback/Loader";

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

type FormState = {
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
};

type ShippingOption = {
  cost: number;
  label: string;
  timeline: string;
};

type Shipping = {
  shippingOptions: ShippingOption[];
  shippingOption: number;
  chooseShipping: (option: number) => () => void;
};

type StripeWrapperProps = {
  cart: Item[];
  formState: FormState;
  shipping: Shipping;
  children: ReactNode;
};

// Load stripe with public key
const stripePromise = loadStripe(
  "pk_test_51LvOubG2F40Ds514YpCJ5gAxc7FQTNhWdNcP3xy2GZT7hdMRGoDeReL2ww5cBpLWnFC88LZlN4QLCLhTUQcoHEoN00Z3hNZh3s"
);

export default function StripeWrapper({
  cart,
  formState,
  shipping,
  children,
}: StripeWrapperProps) {
  const [clientSecret, setClientSecret] = useState<string>("");

  const items = useMemo(() => {
    return cart.map((item: Item) => {
      return { product: item.product._id, quantity: item.quantity };
    });
  }, [cart]);

  const orderVars = {
    items,
    email: formState.email,
    phone: formState.phone,
    shippingOption: shipping.shippingOption,
    toAddress: {
      address1: formState.address1,
      address2: formState.address2,
      city: formState.city,
      state: formState.state,
      postcode: formState.postcode,
    },
  };

  const [getClientSecret, { data: newClientSecret }] = useLazyQuery(
    QUERY_PAYMENT_INTENT,
    {
      variables: orderVars,
    }
  );

  // Get client secret on component render
  useEffect(() => {
    getClientSecret();
  }, [getClientSecret]);

  // Set client secret
  useEffect(() => {
    setClientSecret(newClientSecret?.paymentIntent.clientSecret || "");
  }, [newClientSecret]);

  return (
    <>
      {clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          {children}
        </Elements>
      ) : (
        <>
          <Loader message="Processing order..." />
        </>
      )}
    </>
  );
}
