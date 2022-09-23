import { gql } from "apollo-server-express";

const typeDefs = gql`
  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input OrderInput {
    product: ID!
    quantity: Int!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    emailVerified: Boolean
    orders: [Order]
    likes: [Tag]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Item {
    product: Product
    quantity: Int
  }

  type Order {
    _id: ID!
    orderNum: String!
    items: [Item]
    createdAt: String!
    shippedAt: String
    estimatedArrival: String
    itemCount: Int
  }

  type Product {
    _id: ID!
    fullName: String!
    shortName: String
    modelNumber: String
    price: Float!
    imgURL: String!
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
    parentCategory: Category
    subCategories: [Category]
  }

  type Query {
    me: User
    order(orderId: String!): Order
    products: [Product]
    product(productId: String!): Product
    tags: [Tag]
    categories: [Category]
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      likes: [ID]
      orderId: ID
    ): Auth
    login(username: String!, password: String!): Auth
    newOrder(items: [OrderInput]!): Order
  }
`;

export default typeDefs;
