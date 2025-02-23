import express, { Request, Response } from "express";
import productRouter from "./modules/products/products.router";
import orderRouter from "./modules/orders/order.router";
import authRoute from "./modules/auth/auth.route";
import cors from "cors";
import cartRouter from "./modules/cart/cart.router";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "Server is live⚡",
  });
});

export default app;
