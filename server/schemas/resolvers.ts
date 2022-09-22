import { AuthenticationError } from "apollo-server-express";
import { User, Product, Category, Tag, Order } from "../models";

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // Get all products
    products: async () => {
      return Product.find().populate("tags").populate("categories");
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
      return Category.find()
        .populate("subCategories")
        .populate("parentCategory");
    },
    // Current user, todo: get username from context instead of vars
    me: async (_parent, { username }) => {
      return await User.findOne({ username })
        .populate({
          path: "orders",
          populate: { path: "items.product" },
        })
        .populate("likes");
    },
    // Get single order data, todo: check user matches createdBy
    order: async (parent, { orderId }) => {
      return await Order.findOne({ orderId }).populate("items.product");
    },
  },
  Mutation: {
    addUser: async (
      _parent,
      { username, email, password, likes = [], orderId }
    ) => {
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
  },
};

export default resolvers;
