import { Schema, model, Types } from "mongoose";

interface IOrder {
  orderNum: string;
  items: Types.ObjectId[];
  createdAt: Date;
  shippedAt?: Date;
  estimatedArrival?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    orderNum: {
      type: String,
      // default: uuid(),
      required: true,
      unique: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      // get: timestamp => dateFormat(timestamp)
    },
    shippedAt: {
      type: Date,
      // get: timestamp => dateFormat(timestamp)
    },
    estimatedArrival: {
      type: Date,
      // get: timestamp => dateFormat(timestamp)
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

orderSchema.virtual("itemCount").get(function () {
  return this.items.length;
});

const Order = model("Order", orderSchema);

export default Order;
