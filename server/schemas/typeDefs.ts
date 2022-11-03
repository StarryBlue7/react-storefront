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
    cart: [Item]
    orders: [Order]
    likes: [Tag]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Item {
    product: Product!
    quantity: Int!
    priceAtSale: Float
  }

  type Order {
    _id: ID!
    orderNum: String!
    items: [Item]
    createdBy: ID
    paymentComplete: Boolean
    paidOn: String
    subtotal: Float
    total: Float
    taxPercent: Float
    tax: Float
    shipping: Float
    createdAt: String!
    toAddress: String
    shippedOn: String
    estimatedArrival: String
    itemCount: Int
  }

  type Product {
    _id: ID
    fullName: String
    shortName: String
    modelNumber: String
    price: Float
    imgURL: String
    description: String
    popularity: Int
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

  type ClientSecret {
    clientSecret: String
  }

  type Query {
    me: User
    order(orderId: String, stripeId: String, orderNum: String): Order
    products(tags: [ID], category: ID): [Product]
    product(productId: ID!): Product
    tags: [Tag]
    categories: [Category]
    category(categoryId: ID!): Category
    paymentIntent(
      items: [OrderInput]
      phone: String
      email: String
      toAddress: String
      shippingOption: String
    ): ClientSecret
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
    updateCart(cart: [OrderInput]!): User
  }
`;

export default typeDefs;
