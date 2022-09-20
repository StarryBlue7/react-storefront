import { Schema, model, Types } from "mongoose";

interface IProduct {
  fullName: string;
  shortName: string;
  modelNumber: string;
  price: number;
  tags?: Types.ObjectId[];
  categories?: Types.ObjectId[];
}

const productSchema = new Schema<IProduct>(
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

export default Product;
