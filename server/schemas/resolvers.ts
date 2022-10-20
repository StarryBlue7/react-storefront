import { AuthenticationError } from "apollo-server-express";
import { User, Product, Category, Tag, Order } from "../models";

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
    newOrder: async (_parent, { items }, context) => {
      let createdBy;
      if (context.user) {
        createdBy = context.user._id;
      } else {
        // Assign anonymous user account if order created without login
        const noAccount = await User.findOne({ username: "NoAccount" });
        createdBy = noAccount._id;
      }
      return (await Order.create({ items, createdBy })).populate({
        path: "items",
        populate: { path: "product" },
      });
    },
    updateCart: async (_parent, { cart }, context) => {
      let user;
      if (context.user) {
        user = context.user._id;
      } else {
        // Assign anonymous user account if cart created without login
        const noAccount = await User.findOne({ username: "NoAccount" });
        user = noAccount._id;
      }
      return (await User.findByIdAndUpdate(user, { cart })).populate({
        path: "cart",
        populate: { path: "product" },
      });
    },
  },
};

export default resolvers;
