const express = require("express");
const stripeWebhook = require("express").Router();

const stripe = require("stripe");

const { Order } = require("../models");

// Stripe webhook
export default stripeWebhook.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.WEBHOOK_SECRET
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        const stripeId = paymentIntent?.id;
        // Update order data to reflect completed payment
        await Order.findOneAndUpdate(
          { stripeId },
          { paymentComplete: true, paidOn: Date.now() },
          { new: true }
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Acknowledge receipt of the event
    res.send();
  }
);
