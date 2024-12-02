import { Request, Response } from "express";
import { productService } from "./products.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await productService.createProduct(product);

    res.json({
      message: "Product created successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.json({
      status: false,
      message: "There is a problem creating product",
      error,
      stack: err.stack,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productService.getProduct();
    res.json({
      message: "Products retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.json({
      status: false,
      message: "something went wrong",
      error,
      stack: err.stack,
    });
  }
};

const getSpecificProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const result = await productService.getSpecificProductById(productId);
    res.json({
      message: "Product retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.json({
      status: false,
      message: "There is a problem retrieving product!",
      error,
      stack: err.stack,
    });
  }
};

const updateSpecificStationaryProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const data = req.body;
    const result = await productService.updateSpecificStationaryProduct(
      productId,
      data
    );

    res.json({
      message: "Product updated successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.json({
      status: false,
      message: "There is a problem updating product!",
      error,
      stack: err.stack,
    });
  }
};

const deleteAProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await productService.deleteAProduct(productId);

    res.json({
      message: "Product deleted successfully",
      status: true,
      data: {},
    });
  } catch (error) {
    res.json({
      status: false,
      message: "There is a problem deleting product!",
      error,
    });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getSpecificProductById,
  updateSpecificStationaryProduct,
  deleteAProduct,
};
