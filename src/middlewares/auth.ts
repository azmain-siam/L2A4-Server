import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import config from "../config";

interface IDecoded {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const auth = (requiredRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Check if the token sent from client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    // Check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
        }

        const { role } = decoded as IDecoded;

        if (!requiredRole.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not unauthorized"
          );
        }

        req.user = decoded as JwtPayload;
        next();
      }
    );
  });
};

export default auth;
