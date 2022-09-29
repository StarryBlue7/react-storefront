import { Schema, model, Types } from "mongoose";
import newOrderId from "../utils/orderNum";

interface IOrder {
  orderNum: string;
  items: IItem[];
  subtotal: number;
  total: number;
  createdBy: Types.ObjectId;
  createdAt: Date;
  toAddress: string;
  shippedAt?: Date;
  estimatedArrival?: Date;
}

interface IItem {
  product: Types.ObjectId;
  quantity: number;
}

const itemSchema = new Schema<IItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
});

const orderSchema = new Schema<IOrder>(
  {
    orderNum: {
      type: String,
      default: newOrderId,
      unique: true,
      required: true,
    },
    items: [itemSchema],
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    toAddress: {
      type: String,
      required: true,
    },
    shippedAt: {
      type: Date,
    },
    estimatedArrival: {
      type: Date,
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
  let itemCount = 0;
  this.items.forEach((item) => (itemCount += item.quantity));
  return itemCount;
});

const Order = model("Order", orderSchema);

export default Order;
