import { IProduct } from "./products.interface";
import Product from "./products.model";

const createProduct = async (product: IProduct) => {
  // console.log(product, "product");

  if (product.quantity > 0) {
    product.inStock = true;
  } else {
    product.inStock = false;
  }

  const result = await Product.create(product);

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
  if (data.quantity && data.quantity > 0) {
    data.inStock = true;
  } else {
    data.inStock = false;
  }

  const result = await Product.findByIdAndUpdate(productId, data, {
    runValidators: true,
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
