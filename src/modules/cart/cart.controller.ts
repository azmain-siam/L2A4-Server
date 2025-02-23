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

const getCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.getCartItems(req.params.userId);

  // console.log(result);

  sendResponse(res, {
    status: true,
    message: "Cart fetched successfully",
    data: result,
    statusCode: StatusCodes.OK,
  });
});

export const CartController = {
  addToCart,
  getCart,
};
