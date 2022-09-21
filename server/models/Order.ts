import { Schema, model, Types } from "mongoose";
const { newOrderId } = require('../utils/orderNum');

interface IOrder {
  orderNum: string;
  items: IItem[];
  createdAt: Date;
  shippedAt?: Date;
  estimatedArrival?: Date;
}

interface IItem {
  product: Types.ObjectId;
  quantity: number;
}

const itemSchema = new Schema<IItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
    }
  }
)

const orderSchema = new Schema<IOrder>(
  {
    orderNum: {
      type: String,
      default: newOrderId(),
      required: true,
      unique: true,
    },
    items: [itemSchema],
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
  let itemCount = 0;
  this.items.forEach(item => itemCount += item.quantity)
  return itemCount;
});

const Order = model("Order", orderSchema);

export default Order;
