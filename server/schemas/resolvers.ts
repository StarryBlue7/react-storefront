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
    tags: async () => {
      return Tag.find();
    },
    categories: async () => {
      return Category.find()
        .populate("subCategories")
        .populate("parentCategory");
    },
  },
};

export default resolvers;
