"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
    parentCategory: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategories: [
      {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
var Category = (0, mongoose_1.model)("Category", categorySchema);
exports["default"] = Category;
