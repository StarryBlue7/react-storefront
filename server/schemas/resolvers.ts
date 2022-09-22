import { AuthenticationError } from "apollo-server-express";
import { User, Product, Category, Tag, Order } from "../models";

const resolvers = {
  Query: {
    // Get all products
    products: async () => {
      return Product.find().populate("tags").populate("categories");
    },
    // Single product
    product: async (parent, { productId }) => {
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
    me: async (parent, { username }) => {
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
};

export default resolvers;
