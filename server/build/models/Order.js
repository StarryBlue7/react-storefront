"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var newOrderId = require('../utils/orderNum').newOrderId;
var itemSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: Number
});
var orderSchema = new mongoose_1.Schema({
    orderNum: {
        type: String,
        default: newOrderId(),
        required: true,
        unique: true,
    },
    items: [itemSchema],
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    toAddress: String,
    shippedAt: {
        type: Date
    },
    estimatedArrival: {
        type: Date
    },
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
});
orderSchema.virtual("itemCount").get(function () {
    var itemCount = 0;
    this.items.forEach(function (item) { return itemCount += item.quantity; });
    return itemCount;
});
var Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
