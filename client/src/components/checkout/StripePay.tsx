import React, { FormEvent, useState } from "react";

import { Button, Typography } from "@mui/material";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import Loader from "../feedback/Loader";
import ButtonLoader from "../feedback/ButtonLoader";

export default function StripePay() {
  const [errorMessage, setErrorMessage] = useState<string>(" ");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
      {loading && <Loader message="Loading payment..." />}
      <div
        style={{
          display: loading ? "none" : "flex",
          flexFlow: "column",
          width: "100%",
        }}
      >
        <PaymentElement
          onReady={() => setLoading(false)}
          onFocus={() => setErrorMessage(" ")}
        />
        {errorMessage && <Typography>{errorMessage}</Typography>}
        <Button
          type="submit"
          variant="contained"
          id="submit"
          disabled={!stripe || !elements || submitted}
          sx={{ alignSelf: "flex-end", flexGrow: 0, mt: 2 }}
        >
          Submit
          {submitted && <ButtonLoader />}
        </Button>
      </div>
    </form>
  );
}
