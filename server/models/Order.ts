import { Schema, model, Types } from "mongoose";
import newOrderId from "../utils/orderNum";

interface IOrder {
  orderNum: string;
  items: IItem[];
  createdBy: Types.ObjectId;
  phone: string;
  email: string;
  subtotal: number;
  paymentComplete: boolean;
  paidOn: Date;
  stripeId: string;
  createdAt: Date;
  toAddress: string;
  shippedAt?: Date;
  estimatedArrival?: Date;
}

interface IItem {
  product: Types.ObjectId | any;
  quantity: number;
  priceAtSale: number;
}

const itemSchema = new Schema<IItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
  priceAtSale: Number,
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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    phone: String,
    email: String,
    paymentComplete: {
      type: Boolean,
      default: false,
    },
    paidOn: Date,
    stripeId: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    toAddress: {
      type: String,
      // required: true,
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
  this.items.forEach((item) => {
    itemCount += item.quantity;
  });
  return itemCount;
});

orderSchema
  .virtual("subtotal", {
    ref: "Product",
    localField: "items.product",
    foreignField: "_id",
    justOne: true,
  })
  .get(function () {
    let subtotal = 0;
    this.items.forEach((item) => {
      subtotal += item.product.price * item.quantity;
    });
    return new Number(subtotal.toFixed(2));
  });

const Order = model("Order", orderSchema);

export default Order;
