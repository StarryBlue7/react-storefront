"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    shortName: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    modelNumber: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imgURL: {
        type: String,
        default: "https://via.placeholder.com/200",
    },
    tags: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
    categories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
});
var Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
