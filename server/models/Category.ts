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
        autopopulate: true,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

categorySchema.plugin(require("mongoose-autopopulate"));

const Category = model("Category", categorySchema);

export default Category;
