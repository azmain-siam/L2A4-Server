import { Router } from "express";
import { productController } from "./products.controller";

const productRouter = Router();

productRouter.post("/", productController.createProduct);

export default productRouter;
