import * as React from "react";
import { Button, Dialog, Typography } from "@mui/material";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { FormEvent } from "react";

export default function CheckoutForm() {
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  // Stripe
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Prevent submits until Stripe loaded
    if (!stripe || !elements) {
      return;
    }

    // Disable button to prevent multiple submits
    setSubmitted(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    // Display card or validation errors
    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message || "An unexpected error occured.");
    } else {
      setErrorMessage("An unexpected error occured.");
    }

    // Reenable submit button
    setSubmitted(false);
  };

  return (
    <Dialog open={true}>
      <form style={{ padding: 20 }} onSubmit={handleSubmit}>
        <PaymentElement />
        {errorMessage && <Typography>{errorMessage}</Typography>}
        <Button
          type="submit"
          id="submit"
          disabled={!stripe || !elements || submitted}
        >
          Submit
        </Button>
      </form>
    </Dialog>
  );
}
