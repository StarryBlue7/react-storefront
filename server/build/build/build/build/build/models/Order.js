"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var orderSchema = new mongoose_1.Schema({
    orderNum: {
        type: String,
        // default: uuid(),
        required: true,
        unique: true,
    },
    items: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        // get: timestamp => dateFormat(timestamp)
    },
    shippedAt: {
        type: Date,
        // get: timestamp => dateFormat(timestamp)
    },
    estimatedArrival: {
        type: Date,
        // get: timestamp => dateFormat(timestamp)
    },
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
});
orderSchema.virtual("itemCount").get(function () {
    return this.items.length;
});
var Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
