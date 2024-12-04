import { Request, Response } from "express";
import { productService } from "./products.service";

// Function to handle product creation.
const createProduct = async (req: Request, res: Response) => {
  try {
    // Getting product data from request body.
    const product = req.body;

    // Calling the service function to save a new product to the database.
    const result = await productService.createProduct(product);

    // Sending a success response to the client.
    res.json({
      message: "Product created successfully",
      status: true,
      data: result,
    });
  } catch (error) {
    // Sending an error response to the client.
    const err = error as Error;
    res.json({
      status: false,
      message: "There is a problem creating product",
      error,
      stack: err.stack,
    });
  }
};

// Function to get all products.
const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Calling the service function to get all products from the database.
    const result = await productService.getProduct();

    // Sending a success response to the client.
    res.json({
      message: "Products retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    // Sending an error response to the client.
    const err = error as Error;
    res.json({
      status: false,
      message: "something went wrong",
      error,
      stack: err.stack,
    });
  }
};

// Function to get a specific product from the database.
const getSpecificProductById = async (req: Request, res: Response) => {
  try {
    // Getting product id from request params.
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
    // Getting product id from request params.
    const productId = req.params.productId;

    // Getting the product updation data from request body.
    const data = req.body;

    // Calling service function to update a product by passing the productId and data as arguments.
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

// To delete a specific product.
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
