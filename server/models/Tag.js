"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var tagSchema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
var Tag = (0, mongoose_1.model)("Tag", tagSchema);
exports["default"] = Tag;
