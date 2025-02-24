export interface IOrder {
  email: string;
  products: {
    productId: string;
    quantity: number;
    totalPrice: number;
  }[];
  status: "pending" | "shipping" | "cancelled";
}
