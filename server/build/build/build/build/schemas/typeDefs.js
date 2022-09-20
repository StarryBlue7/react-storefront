"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var typeDefs = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  input UserInput {\n    username: String!\n    email: String!\n    password: String!\n  }\n\n  type User {\n    _id: ID!\n    username: String!\n    email: String!\n    emailVerified: Boolean\n    orders: [Order]\n    likes: [Tag]\n  }\n\n  type Auth {\n    token: ID!\n    username: User\n  }\n\n  type Order {\n    _id: ID!\n    orderNum: String!\n    items: [Product]!\n    createdAt: String!\n    shippedAt: String\n    estimatedArrival: String\n  }\n\n  type Product {\n    _id: ID!\n    fullName: String!\n    shortName: String\n    modelNumber: String\n    price: Float!\n    tags: [Tag]\n    categories: [Category]\n  }\n\n  type Tag {\n    _id: ID!\n    name: String!\n  }\n\n  type Category {\n    _id: ID!\n    name: String!\n    parentCategory: ID\n    subCategories: [ID]\n  }\n\n  type Query {\n    # user: User\n    # orders(_id: String): [Order]\n    products: [Product]\n    product(productId: String!): Product\n    # tags: [Tag]\n    # categories: [Category]\n  }\n\n  # type Mutation {\n  #   addUser(username: String!, email: String!, password: String!): Auth\n  #   login(username: String!, password: String!): Auth\n  # }\n"], ["\n  input UserInput {\n    username: String!\n    email: String!\n    password: String!\n  }\n\n  type User {\n    _id: ID!\n    username: String!\n    email: String!\n    emailVerified: Boolean\n    orders: [Order]\n    likes: [Tag]\n  }\n\n  type Auth {\n    token: ID!\n    username: User\n  }\n\n  type Order {\n    _id: ID!\n    orderNum: String!\n    items: [Product]!\n    createdAt: String!\n    shippedAt: String\n    estimatedArrival: String\n  }\n\n  type Product {\n    _id: ID!\n    fullName: String!\n    shortName: String\n    modelNumber: String\n    price: Float!\n    tags: [Tag]\n    categories: [Category]\n  }\n\n  type Tag {\n    _id: ID!\n    name: String!\n  }\n\n  type Category {\n    _id: ID!\n    name: String!\n    parentCategory: ID\n    subCategories: [ID]\n  }\n\n  type Query {\n    # user: User\n    # orders(_id: String): [Order]\n    products: [Product]\n    product(productId: String!): Product\n    # tags: [Tag]\n    # categories: [Category]\n  }\n\n  # type Mutation {\n  #   addUser(username: String!, email: String!, password: String!): Auth\n  #   login(username: String!, password: String!): Auth\n  # }\n"])));
exports.default = typeDefs;
var templateObject_1;
