import { IProduct } from "./products.interface";
import Product from "./products.model";

const createProduct = async (product: IProduct): Promise<IProduct> => {
  const result: IProduct = await Product.create(product);

  return result;
};

const getProduct = async () => {
  const result = await Product.find();
  return result;
};

const getSpecificProductById = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const updateSpecificStationaryProduct = async (
  productId: string,
  data: Partial<IProduct>
) => {
  const result = await Product.findByIdAndUpdate(productId, data, {
    new: true,
  });
  return result;
};

const deleteAProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const productService = {
  createProduct,
  getProduct,
  getSpecificProductById,
  updateSpecificStationaryProduct,
  deleteAProduct,
};
