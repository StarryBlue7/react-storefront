import { gql } from "apollo-server-express";

const typeDefs = gql`
  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    emailVerified: Boolean
    orders: [Order]
    likes: [Tag]
  }

  type Order {
    _id: ID!
    orderNum: String!
    items: [Product]!
    createdAt: String!
    shippedAt: String
    estimatedArrival: String
  }

  type Product {
    _id: ID!
    fullName: String!
    shortName: String
    modelNumber: String
    price: Float!
    tags: [Tag]
    categories: [Category]
  }

  type Tag {
    _id: ID!
    name: String!
  }

  type Category {
    _id: ID!
    name: String!
    parentCategory: ID
    subCategories: [ID]
  }
`;

module.exports = typeDefs;
