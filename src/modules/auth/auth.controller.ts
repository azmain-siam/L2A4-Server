import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: "User registered successfully!",
    data: result,
  });
});

export const AuthController = {
  register,
};
