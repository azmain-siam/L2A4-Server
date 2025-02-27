import { NextFunction, Request, Response } from "express";
import { productService } from "../products/products.service";
import { orderService } from "./order.service";
// import { IOrder } from "./order.interface";
import catchAsync from "../../utils/catchAsync";
import User from "../user/user.model";
import Product from "../products/products.model";
import Cart from "../cart/cart.model";
import Stripe from "stripe";
import config from "../../config";

// Function to create an order.
// const createOrder = {
//   createOrder: async (
//     req: Request<IOrder>,
//     res: Response
//   ): Promise<Response | undefined> => {
//     try {
//       const order: IOrder = req.body;
//       // return console.log(order);
//       const user = await User.findById(order.user);
//       if (!user) {
//         res.status(404).json({ message: "User not found." });
//         return;
//       }

//       // Iterate through each product in the order
//       for (const item of order.products) {
//         const product = await Product.findById(item.productId);

//         if (!product) {
//           return res
//             .status(404)
//             .json({ message: `Product ${item.productId} not found.` });
//         }

//         // Check if sufficient stock is available
//         if (product.quantity < item.quantity) {
//           res.status(400).json({
//             message: `Insufficient stock for product ${product.name}.`,
//           });
//           return;
//         }
//       }

//       // Create the order
//       const newOrder = await orderService.createOrder(order);

//       // Reduce stock for each product
//       for (const item of order.products) {
//         const product = await productService.getSpecificProductById(
//           item.productId
//         );
//         if (product) {
//           const newQuantity = product.quantity - item.quantity;
//           await productService.updateSpecificStationaryProduct(item.productId, {
//             quantity: newQuantity,
//             inStock: newQuantity > 0,
//           });
//         }
//       }

//       // remove items from the user cart after ordering
//       await Cart.findOneAndUpdate(
//         { userId: order.user },
//         { $set: { items: [] } },
//         { new: true }
//       );

//       res.json({
//         success: true,
//         message: "Order created successfully",
//         data: newOrder,
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "An error occurred while creating the order.",
//         error,
//       });
//     }
//   },
// };

const createNewOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = req.body;
    // return console.log(order);
    const user = await User.findById(order.user);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return next();
    }

    // Iterate through each product in the order
    for (const item of order.products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        res
          .status(404)
          .json({ message: `Product ${item.productId} not found.` });
        return next();
      }

      // Check if sufficient stock is available
      if (product.quantity < item.quantity) {
        res.status(400).json({
          message: `Insufficient stock for product ${product.name}.`,
        });
        return next();
      }
    }

    // Create the order
    const newOrder = await orderService.createOrder(order);

    // Reduce stock for each product
    for (const item of order.products) {
      const product = await productService.getSpecificProductById(
        item.productId
      );
      if (product) {
        const newQuantity = product.quantity - item.quantity;
        await productService.updateSpecificStationaryProduct(item.productId, {
          quantity: newQuantity,
          inStock: newQuantity > 0,
        });
      }
    }

    // remove items from the user cart after ordering
    await Cart.findOneAndUpdate(
      { userId: order.user },
      { $set: { items: [] } },
      { new: true }
    );

    res.json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
    next();
  }
);

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await orderService.getAllOrders();

  res.json({
    success: true,
    message: "Orders retrieved successfully",
    data: orders,
  });
});

const getOrdersByUserId = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const orders = await orderService.getOrdersByUserId(userId);

  res.json({
    success: true,
    message: "Orders retrieved successfully",
    data: orders,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const updatedOrder = await orderService.updateOrderStatus(orderId, status);

  res.json({
    success: true,
    message: "Order status updated successfully",
    data: updatedOrder,
  });
});

// Function to calculate the total revenue from all orders
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderService.calculateRevenue();

    res.json({
      message: "Revenue calculated successfully",
      success: true,
      data: {
        totalRevenue: result,
      },
    });
  } catch (error) {
    res.json({
      message: "An error occurred while creating the order.",
      error,
    });
  }
};

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { amount, currency } = req.body;
  const stripeAmount = Math.round(amount * 100);

  const stripe = new Stripe(config.stripe_secret_key as string);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: stripeAmount,
    currency,
  });

  res.json({ clientSecret: paymentIntent.client_secret });
});

export const orderController = {
  // createOrder,
  createNewOrder,
  calculateRevenue,
  getAllOrders,
  getOrdersByUserId,
  updateOrderStatus,
  createPayment,
};
