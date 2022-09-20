import { AuthenticationError } from "apollo-server-express";
import { User, Product, Category, Tag, Order } from "../models";

const resolvers = {
  Query: {
    products: async () => {
      return Product.find().populate("tags").populate("categories");
    },
    product: async (parent, { productId }) => {
      return Product.findById(productId)
        .populate("tags")
        .populate("categories");
    },
  },
};

export default resolvers;
