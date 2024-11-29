import { model, Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: [true, "Please provide your name"] },
  brand: { type: String, required: [true, "Please provide product brand"] },
  price: { type: Number, required: [true, "Please provide product price"] },
  category: {
    type: String,
    enum: {
      values: [
        "Writing",
        "Office Supplies",
        "Art Supplies",
        "Educational",
        "Technology",
      ],
      message: "{VALUE} is not valid, please provide a valid category",
    },
    required: [true, "Please provide product category"],
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
  },
  quantity: {
    type: Number,
    required: [true, "Please provide product quantity"],
  },
  inStock: {
    type: Boolean,
    required: [true, "Please provide the stock of product"],
  },
});

const Product = model("Product", productSchema);

export default Product;
