const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
      minLength: 3
    },
    shortName: {
      type: String,
      required: true,
      unique: true,
      minLength: 3
    },
    modelNumber: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true
    },
    tags: [],
    categories: [],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Product = model('Product', productSchema);

module.exports = Product;
