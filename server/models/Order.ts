import { Schema, model, Types } from "mongoose";
import newOrderId from "../utils/orderNum";

interface IOrder {
  orderNum: string;
  items: IItem[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  toAddress: String;
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
    },
    items: [itemSchema],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    toAddress: String,
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
