import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";

const orderRouter = Router();

orderRouter.post("/", orderController.createOrder);
orderRouter.get("/", orderController.getAllOrders);
orderRouter.get("/revenue", auth("admin"), orderController.calculateRevenue);

export default orderRouter;
