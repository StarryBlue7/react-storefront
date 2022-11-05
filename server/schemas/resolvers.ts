import { AuthenticationError, UserInputError } from "apollo-server-express";
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
    },
    // Single category &
    category: async (_parent, { categoryId }) => {
      return Category.findById(categoryId).populate("parentCategory");
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
        throw new AuthenticationError("You need to be logged in!");
      }
    },
    // Get single order data, TODO: Add auth check for returning order data
    order: async (_parent, { orderId, stripeId, orderNum }) => {
      // Search by order ID
      if (orderId) {
        return await Order.findById(orderId).populate("items.product");
      }

      // Search by other identifiers
      let searchBy = {};
      if (stripeId) {
        searchBy = { stripeId };
      } else if (orderNum) {
        searchBy = { orderNum };
      } else {
        throw new UserInputError("No order identifier given!");
      }

      return await Order.findOne(searchBy).populate("items.product");
    },
    paymentIntent: async (
      _parent,
      { items, email, phone, toAddress },
      context
    ) => {
      const createdBy = context.user ? context.user._id : null;

      const newOrder = await Order.create({
        items,
        email,
        phone,
        toAddress,
        createdBy,
      });
      await newOrder.populate("items.product");

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
        newOrder.items.forEach((item: any) => {
          item.priceAtSale = item.product.price;
        });

        await newOrder.save();

        console.log("secret", paymentIntent.client_secret);
        // Send PaymentIntent client_secret to client.
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
    updateCart: async (_parent, { cart }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in!");
      }
      return (
        await User.findByIdAndUpdate(context.user._id, { cart }, { new: true })
      ).populate({
        path: "cart",
        populate: { path: "product" },
      });
    },
  },
};

export default resolvers;
