import { ObjectId } from "mongoose";

export interface IOrder {
  user: ObjectId;
  products: {
    productId: string;
    quantity: number;
    totalPrice: number;
  }[];
  status: "pending" | "shipping" | "cancelled";
}
