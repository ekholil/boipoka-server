import express from "express";
import {
  addToWishList,
  getWishList,
  userLoginController,
  userSignupControler,
} from "./user.conroller";
import validateRequest from "../../middlewares/validateRequest";
import { userLoginZodValidation, userZodValidation } from "./user.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

// user signup
router.post(
  "/auth/signup",
  validateRequest(userZodValidation),
  userSignupControler
);

// user login
router.post(
  "/auth/login",
  validateRequest(userLoginZodValidation),
  userLoginController
);
// add to wishlist
router.post("/wishlist", auth(), addToWishList);
router.get("/wishlist", auth(), getWishList);
// refresh token
// router.post("/auth/refresh-token", validateRequest(refreshTokenZodValidation), refreshTokenUserController)

export default router;
