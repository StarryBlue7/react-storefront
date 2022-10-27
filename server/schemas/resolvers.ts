import { AuthenticationError } from "apollo-server-express";
import { User, Product, Category, Tag, Order } from "../models";

import Stripe from "stripe";
import { stripe, dollarsToCents } from "../utils/stripe";

const { signToken } = require("../utils/auth");

type ProductFilter = {
  tags?: any;
  categories?: any;
};

const resolvers = {
  Query: {
    /**
     * Get all products with optional tags & category filters
     */
    products: async (_parent, { tags, category }) => {
      const filter: ProductFilter = {};
      tags && (filter.tags = { $in: tags });
      category && (filter.categories = category);
      return Product.find(filter).populate("tags").populate("categories");
    },
    // Single product
    product: async (_parent, { productId }) => {
      return Product.findById(productId)
        .populate("tags")
        .populate("categories");
    },
    // All tags
    tags: async () => {
      return Tag.find();
    },
    // All categories
    categories: async () => {
      return Category.find({ parentCategory: null }).populate("subCategories");
      // .populate("parentCategory");
    },
    // Current user
    me: async (_parent, _args, context) => {
      if (context.user) {
        return await User.findById(context.user._id)
          .populate({
            path: "orders",
            populate: { path: "items.product" },
          })
          .populate({
            path: "cart",
            populate: { path: "product" },
          })
          .populate("likes");
      } else {
        new AuthenticationError("You need to be logged in!");
      }
    },
    // Get single order data, todo: check user matches createdBy
    order: async (_parent, { orderId }) => {
      return await Order.findOne({ orderId }).populate("items.product");
    },
    paymentIntent: async (_parent, { items }, context) => {
      console.log("payment intent", items);
      console.log("context", context.user);
      const createdBy = context.user ? context.user._id : null;
      const newOrder = await Order.create({
        items: items,
        createdBy,
      });
      await newOrder.populate("items.product");
      console.log("order created", newOrder.toObject({ virtuals: true }));
      const params: Stripe.PaymentIntentCreateParams = {
        amount: dollarsToCents(newOrder.subtotal),
        currency: "USD",
        automatic_payment_methods: {
          enabled: true,
        },
      };

      try {
        const paymentIntent: Stripe.PaymentIntent =
          await stripe.paymentIntents.create(params);

        newOrder.stripeId = paymentIntent.id;
        await newOrder.save();
        // Send publishable key and PaymentIntent client_secret to client.
        // console.log("intent created: ", paymentIntent);
        return {
          clientSecret: paymentIntent.client_secret,
        };
      } catch (e) {
        throw new Error(e.message);
      }
    },
  },
  Mutation: {
    addUser: async (
      _parent,
      { username, email, password, likes = [], orderId }
    ) => {
      // Include previously created order for new account
      const orders = orderId ? [orderId] : [];
      const user = await User.create({
        username,
        email,
        password,
        likes,
        orders,
      });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_parent, { username, password }) => {
      // Check user exists
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("User not found!");
      }

      // Check password
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Username or password was incorrect.");
      }

      const token = signToken(user);

      return { token, user };
    },

    newOrder: async (_parent, { source, items, email }, context) => {
      let createdBy,
        stripeId = "";
      let order;

      if (context.user) {
        const account = await User.findById(context.user._id);
        createdBy = context.user._id;

        if (account.stripeId) {
          stripeId = account.stripeId;
        } else {
          const customer = await stripe.customers.create({
            email: context.user.email,
            source,
          });
          stripeId = customer.id;
          await User.findByIdAndUpdate(context.user._id, { stripeId });
        }

        await stripe.customers.update(stripeId, {
          source,
        });
        order = await stripe.orders.create({
          customer: stripeId,
          items,
        });
      } else if (email) {
        order = await stripe.orders.create({
          email,
          source,
          items,
        });
      } else {
        throw new AuthenticationError("No user or email found.");
      }

      console.log(order);

      const newOrder = (
        await Order.create({ items, createdBy, stripeId })
      ).populate({
        path: "items",
        populate: { path: "product" },
      });

      if (context.user) {
      }

      return newOrder;
    },
    updateCart: async (_parent, { cart }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in!");
      }
      return (
        await User.findByIdAndUpdate(context.user._id, { cart })
      ).populate({
        path: "cart",
        populate: { path: "product" },
      });
    },
  },
};

export default resolvers;
