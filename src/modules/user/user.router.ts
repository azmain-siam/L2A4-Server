import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";

const userRouter = Router();

userRouter.get("/", auth(["admin"]), userController.getAllUsers);
userRouter.get("/:userId", userController.getUserById);
userRouter.patch("/update/:userId", auth(["admin"]), userController.updateUser);
userRouter.patch("/update/address/:userId", userController.updateUserAddress);

export default userRouter;
