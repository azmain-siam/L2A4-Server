import { IAddToCart } from "./cart.interface";
import Cart from "./cart.model";

const addToCartService = async (payload: IAddToCart) => {
  const { userId, productId, quantity: cartQuantity } = payload;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [{ productId, cartQuantity }] });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].cartQuantity += cartQuantity;
    } else {
      cart.items.push({ productId, cartQuantity });
    }
  }

  const result = await Cart.create(cart);

  return result;
};

const getCartItems = async (userId: string) => {
  const cart = await Cart.findOne({ userId }).populate("items.productId");

  return cart;
};

export const CartService = {
  addToCartService,
  getCartItems,
};
