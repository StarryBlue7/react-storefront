"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var models_1 = require("../models");
var signToken = require("../utils/auth").signToken;
var resolvers = {
    Query: {
        // Get all products
        products: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, models_1.Product.find().populate("tags").populate("categories")];
            });
        }); },
        // Single product
        product: function (_parent, _a) {
            var productId = _a.productId;
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    return [2 /*return*/, models_1.Product.findById(productId)
                            .populate("tags")
                            .populate("categories")];
                });
            });
        },
        // All tags
        tags: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, models_1.Tag.find()];
            });
        }); },
        // All categories
        categories: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, models_1.Category.find()
                        .populate("subCategories")
                        .populate("parentCategory")];
            });
        }); },
        // Current user, todo: get username from context instead of vars
        me: function (_parent, _a) {
            var username = _a.username;
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, models_1.User.findOne({ username: username })
                                .populate({
                                path: "orders",
                                populate: { path: "items.product" },
                            })
                                .populate("likes")];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        // Get single order data, todo: check user matches createdBy
        order: function (parent, _a) {
            var orderId = _a.orderId;
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, models_1.Order.findOne({ orderId: orderId }).populate("items.product")];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
    },
    Mutation: {
        addUser: function (_parent, _a) {
            var username = _a.username, email = _a.email, password = _a.password, _b = _a.likes, likes = _b === void 0 ? [] : _b, orderId = _a.orderId;
            return __awaiter(void 0, void 0, void 0, function () {
                var orders, user, token;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            orders = orderId ? [orderId] : [];
                            return [4 /*yield*/, models_1.User.create({
                                    username: username,
                                    email: email,
                                    password: password,
                                    likes: likes,
                                    orders: orders,
                                })];
                        case 1:
                            user = _c.sent();
                            token = signToken(user);
                            return [2 /*return*/, { token: token, user: user }];
                    }
                });
            });
        },
        login: function (_parent, _a) {
            var username = _a.username, password = _a.password;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, correctPw, token;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, models_1.User.findOne({ username: username })];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                throw new apollo_server_express_1.AuthenticationError("User not found!");
                            }
                            return [4 /*yield*/, user.isCorrectPassword(password)];
                        case 2:
                            correctPw = _b.sent();
                            if (!correctPw) {
                                throw new apollo_server_express_1.AuthenticationError("Username or password was incorrect.");
                            }
                            token = signToken(user);
                            return [2 /*return*/, { token: token, user: user }];
                    }
                });
            });
        },
    },
};
exports.default = resolvers;
