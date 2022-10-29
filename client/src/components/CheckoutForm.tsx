import * as React from "react";
import { Button, Typography } from "@mui/material";
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
    <form
      style={{ padding: 20, display: "flex", flexFlow: "column" }}
      onSubmit={handleSubmit}
    >
      <PaymentElement />
      {errorMessage && <Typography>{errorMessage}</Typography>}
      <Button
        type="submit"
        variant="contained"
        id="submit"
        disabled={!stripe || !elements || submitted}
        sx={{ alignSelf: "flex-end", flexGrow: 0 }}
      >
        Submit
      </Button>
    </form>
  );
}
