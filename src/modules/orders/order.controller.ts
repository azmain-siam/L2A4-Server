import { Request, Response } from "express";
import { productService } from "../products/products.service";
import { orderService } from "./order.service";
import { IOrder } from "./order.interface";
import catchAsync from "../../utils/catchAsync";

// Function to create an order.
const createOrder = async (req: Request<IOrder>, res: Response) => {
  try {
    const order = req.body;
    const product = await productService.getSpecificProductById(order.product);
    if (!product) {
      res.json({
        message: "Product not found.",
      });
      return;
    }

    // Check if there is sufficient stock
    if (product.quantity < order.quantity) {
      res.json({ message: "Insufficient stock available." });
      return;
    }

    // Create the order
    const newOrder = await orderService.createOrder(order);

    // Reduce the quantity of the product
    const newQuantity = product.quantity - order.quantity;

    // Update inStock field and quantity field
    await productService.updateSpecificStationaryProduct(order.product, {
      quantity: newQuantity,
      inStock: newQuantity > 0,
    });

    res.json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    res.json({
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
