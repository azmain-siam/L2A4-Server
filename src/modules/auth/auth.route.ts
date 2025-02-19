import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const authRoute = Router();

authRoute.post("/register", AuthController.register);
authRoute.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login
);

export default authRoute;
