import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsers();

  sendResponse(res, {
    data: result,
    status: true,
    message: "All users fetched successfully",
    statusCode: StatusCodes.OK,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await userService.getUserById(userId);

  sendResponse(res, {
    data: result,
    status: true,
    message: "All users fetched successfully",
    statusCode: StatusCodes.OK,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await userService.updateUserStatus(
    req.params.userId,
    req.body.status
  );

  sendResponse(res, {
    data: result,
    status: true,
    message: "User status updated successfully",
    statusCode: StatusCodes.OK,
  });
});

const updateUserAddress = catchAsync(async (req, res) => {
  const result = await userService.updateUserAddress(
    req.params.userId,
    req.body.address
  );

  sendResponse(res, {
    data: result,
    status: true,
    message: "User address updated successfully",
    statusCode: StatusCodes.OK,
  });
});

export const userController = {
  getAllUsers,
  updateUser,
  updateUserAddress,
  getUserById,
};
