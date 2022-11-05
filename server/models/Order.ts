import { Schema, model, Types } from "mongoose";
import newOrderId from "../utils/orderNum";

interface IOrder {
  orderNum: string;
  items: IItem[];
  createdBy: Types.ObjectId;
  phone: string;
  email: string;
  subtotal: number;
  taxPercent: number;
  tax: number;
  shipping: number;
  paymentComplete: boolean;
  paidOn: Date;
  stripeId: string;
  createdAt: Date;
  toAddress: IAddress;
  shippedOn?: Date;
  estimatedArrival?: Date;
}

interface IItem {
  product: Types.ObjectId | any;
  quantity: number;
  priceAtSale: number;
}

interface IAddress {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
}

const itemSchema = new Schema<IItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
  priceAtSale: Number,
});

const addressSchema = new Schema<IAddress>({
  address1: String,
  address2: String,
  city: String,
  state: String,
  postcode: String,
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
    taxPercent: {
      type: Number,
      default: 0.0725,
    },
    shipping: {
      type: Number,
      default: 5,
    },
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
      type: addressSchema,
      required: true,
    },
    shippedOn: {
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

// Calculate total item count virtual
orderSchema.virtual("itemCount").get(function () {
  let itemCount = 0;
  this.items.forEach((item) => {
    itemCount += item.quantity;
  });
  return itemCount;
});

// Calculate subtotal virtual
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

// Calculate tax virtual
orderSchema.virtual("tax").get(function () {
  const tax = this.subtotal * this.taxPercent;
  return new Number(tax.toFixed(2));
});

// Calculate total charge
orderSchema.virtual("total").get(function () {
  const tax = this.subtotal + this.tax + this.shipping;
  return new Number(tax.toFixed(2));
});

const Order = model("Order", orderSchema);

export default Order;
