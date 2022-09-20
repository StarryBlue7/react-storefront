import { Schema, model, Types } from "mongoose";

interface ITag {
  name: string;
}

const tagSchema = new Schema<ITag>(
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

const Tag = model("Tag", tagSchema);

export default Tag;
