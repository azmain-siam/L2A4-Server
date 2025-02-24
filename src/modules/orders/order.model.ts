import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.ObjectId, required: true, ref: "User" },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: [true, "Product is required"],
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
    ],
    status: {
      type: String,
      required: true,
      enum: ["pending", "shipping", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
