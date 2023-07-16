import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";
import jwt from "jsonwebtoken";

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  let verifedUser: JwtPayload | null = null;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    verifedUser = jwt.verify(token, config.jwt.secret as Secret) as JwtPayload;
    if (!verifedUser) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Token");
    }
    req.user = verifedUser;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
