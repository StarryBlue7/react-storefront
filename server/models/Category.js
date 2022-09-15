const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Category = model("Category", categorySchema);

module.exports = Category;
