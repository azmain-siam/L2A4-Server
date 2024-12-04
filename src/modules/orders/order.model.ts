import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^[^@]+@[^@]+\.[^@]+$/, "Please provide a valid email address"],
    },
    product: {
      type: Schema.Types.ObjectId,
      required: [true, "Product is required."],
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer",
      },
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price must be a positive number"],
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
