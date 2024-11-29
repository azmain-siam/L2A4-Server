import { Request, Response } from "express";
import { productService } from "./products.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await productService.createProduct(product);

    res.json({
      status: true,
      message: "Product created successfully",
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "something went wrong",
      error,
      // stack: error.stack,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await productService.getProduct();
    res.json({
      success: true,
      message: "Products getting successfully",
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "something went wrong",
      error,
    });
  }
};

export const productController = {
  createProduct,
  getProducts,
};
