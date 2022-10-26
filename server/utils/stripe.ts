require("dotenv").config();

export const stripe = require("stripe")(process.env.STRIPE_SECRET);

export const dollarsToCents = (amount: number) => Math.floor(amount * 100);
