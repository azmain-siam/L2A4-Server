import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    brand: {
      type: String,
      required: [true, "Please provide the product brand"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      min: [0, "Price must be a positive number"],
    },
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
      required: [true, "Please provide the product category"],
    },
    description: {
      type: String,
      required: [true, "Please provide the product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide the product quantity"],
      min: [0, "Quantity cannot be negative"],
    },
    inStock: {
      type: Boolean,
      required: [true, "Please specify if the product is in stock"],
    },
    image: { type: String },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
