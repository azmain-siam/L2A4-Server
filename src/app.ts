import express, { Request, Response } from "express";
import productRouter from "./modules/products/products.router";

const app = express();

app.use(express.json());
app.use("/api/products", productRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "Server is live⚡",
  });
});

export default app;
