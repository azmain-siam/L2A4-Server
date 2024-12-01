import { Request, Response } from "express";
import { productService } from "../products/products.service";
import { orderService } from "./order.service";
import { IOrder } from "./order.interface";

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

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.calculateRevenue();

    res.json({
      success: true,
      totalRevenue,
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
};
