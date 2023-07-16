"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_conroller_1 = require("./user.conroller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
// user signup
router.post("/auth/signup", (0, validateRequest_1.default)(user_validation_1.userZodValidation), user_conroller_1.userSignupControler);
// user login
router.post("/auth/login", (0, validateRequest_1.default)(user_validation_1.userLoginZodValidation), user_conroller_1.userLoginController);
// refresh token
// router.post("/auth/refresh-token", validateRequest(refreshTokenZodValidation), refreshTokenUserController)
exports.default = router;
