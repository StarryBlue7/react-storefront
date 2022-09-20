import { Schema, model, Types } from "mongoose";

interface ICategory {
  name: string;
  parentCategory?: Types.ObjectId;
  subCategories?: Types.ObjectId[];
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategories: [
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

const Category = model("Category", categorySchema);

export default Category;
