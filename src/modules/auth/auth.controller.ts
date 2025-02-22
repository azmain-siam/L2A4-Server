import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import User from "../user/user.model";

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    sendResponse(res, {
      status: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Email already registered",
    });
  }

  const result = await AuthService.register(req.body);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: "User registered successfully!",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  // return console.log(result);

  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
  });

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Logged in successfully",
    data: {
      token: accessToken,
    },
  });
});

export const AuthController = {
  register,
  login,
};
