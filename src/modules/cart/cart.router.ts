import { Router } from "express";
import { CartController } from "./cart.controller";

const cartRouter = Router();

cartRouter.post("/", CartController.addToCart);
cartRouter.get("/:userId", CartController.getCart);

export default cartRouter;
