export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IAddToCart {
  userId: string;
  productId: string;
  quantity: number;
}
