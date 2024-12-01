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
      message: "Products retrieved successfully",
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

const getSpecificProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const result = await productService.getSpecificProductById(productId);
    res.json({
      status: true,
      message: "Product retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "There is a problem retrieving product!",
      error,
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
    res.json({
      status: false,
      message: "There is a problem updating product!",
      error,
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
  getProducts,
  getSpecificProductById,
  updateSpecificStationaryProduct,
  deleteAProduct,
};
