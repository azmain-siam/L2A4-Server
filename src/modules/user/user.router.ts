import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";

const userRouter = Router();

userRouter.get("/", auth(["admin"]), userController.getAllUsers);
userRouter.patch("/update/:userId", auth(["admin"]), userController.updateUser);

export default userRouter;
