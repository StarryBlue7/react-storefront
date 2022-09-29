import { Schema, model, Types } from "mongoose";

interface IProduct {
  fullName: string;
  shortName: string;
  modelNumber: string;
  price: number;
  imgURL: string;
  description?: string;
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
    imgURL: {
      type: String,
      default: "https://via.placeholder.com/200",
    },
    description: {
      type: String,
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
