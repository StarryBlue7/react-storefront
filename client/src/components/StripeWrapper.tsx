import * as React from "react";
import { Typography } from "@mui/material";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useLazyQuery } from "@apollo/client";
import { QUERY_PAYMENT_INTENT } from "../utils/queries";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51LvOubG2F40Ds514YpCJ5gAxc7FQTNhWdNcP3xy2GZT7hdMRGoDeReL2ww5cBpLWnFC88LZlN4QLCLhTUQcoHEoN00Z3hNZh3s"
);

export default function StripeWrapper({ cart, children }: any) {
  const [clientSecret, setClientSecret] = React.useState<string>("");

  const items = React.useMemo(() => {
    return cart.map((item: any) => {
      return { product: item.product._id, quantity: item.quantity };
    });
  }, [cart]);

  const [getClientSecret, { data: newClientSecret }] = useLazyQuery(
    QUERY_PAYMENT_INTENT,
    {
      variables: { items },
    }
  );

  // Get client secret on component render
  React.useEffect(() => {
    getClientSecret();
  }, [getClientSecret]);

  // Set client secret
  React.useEffect(() => {
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
          <Typography variant="h3">Loading...</Typography>
        </>
      )}
    </>
  );
}
