import { Request, Response } from "express";
import { productService } from "../products/products.service";
import { orderService } from "./order.service";
import { IOrder } from "./order.interface";
import catchAsync from "../../utils/catchAsync";

// Function to create an order.
const createOrder = async (req: Request<IOrder>, res: Response) => {
  try {
    const order = req.body;

    // Iterate through each product in the order
    for (const item of order.products) {
      const product = await productService.getSpecificProductById(
        item.productId
      );

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${item.productId} not found.` });
      }

      // Check if sufficient stock is available
      if (product.quantity < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for product ${product.name}.` });
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

    res.json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the order.",
      error,
    });
  }
};

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await orderService.getAllOrders();

  res.json({
    success: true,
    message: "Orders retrieved successfully",
    data: orders,
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

export const orderController = {
  createOrder,
  calculateRevenue,
  getAllOrders,
};
