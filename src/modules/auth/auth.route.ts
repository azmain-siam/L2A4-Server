import { Router } from "express";
import { AuthController } from "./auth.controller";

const authRoute = Router();

authRoute.post("/register", AuthController.register);

export default authRoute;
