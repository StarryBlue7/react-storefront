import * as React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useLazyQuery } from "@apollo/client";
import { QUERY_PAYMENT_INTENT } from "../../utils/queries";
import Loader from "../feedback/Loader";

// Load stripe with public key
const stripePromise = loadStripe(
  "pk_test_51LvOubG2F40Ds514YpCJ5gAxc7FQTNhWdNcP3xy2GZT7hdMRGoDeReL2ww5cBpLWnFC88LZlN4QLCLhTUQcoHEoN00Z3hNZh3s"
);

export default function StripeWrapper({ cart, children, formState }: any) {
  const [clientSecret, setClientSecret] = React.useState<string>("");

  const items = React.useMemo(() => {
    return cart.map((item: any) => {
      return { product: item.product._id, quantity: item.quantity };
    });
  }, [cart]);

  const orderVars = {
    items,
    email: formState.email,
    phone: formState.phone,
    toAddress: `${formState.address1} 
${formState.address2}
${formState.city}, ${formState.state} ${formState.postcode}`,
  };

  const [getClientSecret, { data: newClientSecret }] = useLazyQuery(
    QUERY_PAYMENT_INTENT,
    {
      variables: orderVars,
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
          <Loader message="Processing order..." />
        </>
      )}
    </>
  );
}
