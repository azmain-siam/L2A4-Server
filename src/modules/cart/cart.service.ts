import { IAddToCart } from "./cart.interface";
import Cart from "./cart.model";

const addToCartService = async (payload: IAddToCart) => {
  const { userId, productId, quantity } = payload;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [{ productId, quantity }] });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }

  const result = await Cart.create(cart);

  return result;
};

export const CartService = {
  addToCartService,
};
