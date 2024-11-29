import express, { Request, Response } from "express";
// import userRouter from "./module/user/user.router";

const app = express();

app.use(express.json());
// app.use("/api/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "Server is live⚡",
  });
});

export default app;
