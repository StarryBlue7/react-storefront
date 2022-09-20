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

  type Auth {
    token: ID!
    username: User
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

  type Query {
    user: User
    orders(_id: String): [Order]
    products: [Product]
    tags: [Tag]
    categories: [Category]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;