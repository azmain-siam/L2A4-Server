import { IProduct } from "./products.interface";
import Product from "./products.model";

const createProduct = async (product: IProduct): Promise<IProduct> => {
  const result: IProduct = await Product.create(product);

  return result;
};

export const productService = {
  createProduct,
};
