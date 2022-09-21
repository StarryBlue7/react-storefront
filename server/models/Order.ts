import { Schema, model, Types } from "mongoose";
const { newOrderId } = require('../utils/orderNum');

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
      default: newOrderId(),
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
      default: Date.now()
    },
    shippedAt: {
      type: Date
    },
    estimatedArrival: {
      type: Date
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
