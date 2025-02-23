import { ObjectId } from "mongoose";

export interface CartItem {
  _id?: ObjectId;
  productId: string;
  cartQuantity: number;
}

export interface ICart {
  userId: ObjectId;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IAddToCart {
  userId: string;
  productId: string;
  quantity: number;
}
