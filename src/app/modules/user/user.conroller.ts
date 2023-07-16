import { Response, Request, NextFunction } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getMyProfileService,
  getSingleUser,
  refreshTokenUserService,
  updateUser,
  userLoginService,
} from "./user.service";
import config from "../../../config";
// User sign up
export const userSignupControler = async (req: Request, res: Response) => {
  const result = await createUser(req.body);
  res.send({
    success: true,
    statusCode: 200,
    message: "User Created Successfully",
    data: result,
  });
};

// user login
export const userLoginController = async (req: Request, res: Response) => {
  const result = await userLoginService(req.body);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.send({
    success: true,
    statusCode: 200,
    message: "User Logged in Successfully",
    data: others,
  });
};

// refresh token controller
export const refreshTokenUserController = async (
  req: Request,
  res: Response
) => {
  const { refreshToken } = req.cookies;
  const result = await refreshTokenUserService(refreshToken);

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.send({
    success: true,
    statusCode: 200,
    message: "New Access token generated Successfully",
    data: result,
  });
};

// Get all user
export const getAllUserController = async (req: Request, res: Response) => {
  const result = await getAllUser();
  res.send({
    success: true,
    statusCode: 200,
    message: "Users Retrieved succesfully",
    data: result,
  });
};

// get single user
export const getSingleUserController = async (req: Request, res: Response) => {
  const result = await getSingleUser(req.params.id);
  if (!result) {
    res.send({
      success: false,
      statusCode: 400,
      message: "User not found",
      data: null,
    });
  } else {
    res.send({
      success: true,
      statusCode: 200,
      message: "User Retrieved Successfully",
      data: result,
    });
  }
};

// delete user
export const deleteUserController = async (req: Request, res: Response) => {
  const result = await deleteUser(req.params.id);
  res.send({
    success: true,
    statusCode: 200,
    message: "User Ueleted Successfully",
    data: result,
  });
};

// update user
export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const result = await updateUser(id, payload);
    res.send({
      success: true,
      statusCode: 200,
      message: "User Updated Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// my profile
export const myProfileController = async (req: Request, res: Response) => {
  const result = await getMyProfileService(req.user?.id);
  if (!result) {
    res.send({
      success: false,
      statusCode: 400,
      message: "User not found",
      data: null,
    });
  } else {
    res.send({
      success: true,
      statusCode: 200,
      message: "User Retrieved Successfully",
      data: result,
    });
  }
};

// update user
export const myProfileUpdateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const result = await updateUser(req.user?.id, payload);
    res.send({
      success: true,
      statusCode: 200,
      message: "User Updated Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
