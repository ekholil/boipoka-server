import express from "express";
import { userLoginController, userSignupControler } from "./user.conroller";
import validateRequest from "../../middlewares/validateRequest";
import { userLoginZodValidation, userZodValidation } from "./user.validation";

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

// refresh token
// router.post("/auth/refresh-token", validateRequest(refreshTokenZodValidation), refreshTokenUserController)

export default router;
