import express, { Request, Response } from "express";
import productRouter from "./modules/products/products.router";
import orderRouter from "./modules/orders/order.router";

const app = express();

app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "Server is live⚡",
  });
});

export default app;
