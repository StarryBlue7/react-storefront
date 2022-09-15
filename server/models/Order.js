const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
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

module.exports = Order;
