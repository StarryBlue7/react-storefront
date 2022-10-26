import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51LvOubG2F40Ds514YpCJ5gAxc7FQTNhWdNcP3xy2GZT7hdMRGoDeReL2ww5cBpLWnFC88LZlN4QLCLhTUQcoHEoN00Z3hNZh3s"
);

export default function StripeWrapper({ children }: any) {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <Checkout />
    </Elements>
  );
}
