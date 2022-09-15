const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
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
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
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

const Product = model("Product", productSchema);

module.exports = Product;
