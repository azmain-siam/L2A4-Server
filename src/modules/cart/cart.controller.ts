import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CartService } from "./cart.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.addToCartService(req.body);

  // console.log(result);

  sendResponse(res, {
    status: true,
    message: "Product added to cart successfully",
    data: result,
    statusCode: StatusCodes.CREATED,
  });
});

export const CartController = {
  addToCart,
};
