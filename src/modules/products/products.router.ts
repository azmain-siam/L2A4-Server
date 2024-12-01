import { Router } from "express";
import { productController } from "./products.controller";

const productRouter = Router();

productRouter.post("/", productController.createProduct);
productRouter.get("/", productController.getProducts);
productRouter.get("/:productId", productController.getSpecificProductById);
productRouter.put(
  "/:productId",
  productController.updateSpecificStationaryProduct
);
productRouter.delete("/:productId", productController.deleteAProduct);

export default productRouter;
