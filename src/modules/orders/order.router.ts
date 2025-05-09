import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";

const orderRouter = Router();

orderRouter.post("/", orderController.createNewOrder);
orderRouter.get("/", auth(["user", "admin"]), orderController.getAllOrders);
orderRouter.get("/:userId", orderController.getOrdersByUserId);
orderRouter.get("/revenue", orderController.calculateRevenue);
orderRouter.get("/revenue/admin", orderController.calculateRevenueAdmin);
orderRouter.patch(
  "/:orderId",
  auth(["admin", "user"]),
  orderController.updateOrderStatus
);
orderRouter.post("/payment", orderController.createPayment);

export default orderRouter;
