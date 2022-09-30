"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var orderNum_1 = __importDefault(require("../utils/orderNum"));
var itemSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: Number,
    priceAtSale: Number,
});
var orderSchema = new mongoose_1.Schema({
    orderNum: {
        type: String,
        default: orderNum_1.default,
        unique: true,
        required: true,
    },
    items: [itemSchema],
    subtotal: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    toAddress: {
        type: String,
        required: true,
    },
    shippedAt: {
        type: Date,
    },
    estimatedArrival: {
        type: Date,
    },
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
});
orderSchema.virtual("itemCount").get(function () {
    var itemCount = 0;
    this.items.forEach(function (item) { return (itemCount += item.quantity); });
    return itemCount;
});
var Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
