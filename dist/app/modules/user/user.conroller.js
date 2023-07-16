"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myProfileUpdateController = exports.myProfileController = exports.updateUserController = exports.deleteUserController = exports.getSingleUserController = exports.getAllUserController = exports.refreshTokenUserController = exports.userLoginController = exports.userSignupControler = void 0;
const user_service_1 = require("./user.service");
const config_1 = __importDefault(require("../../../config"));
// User sign up
const userSignupControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_service_1.createUser)(req.body);
    res.send({
        success: true,
        statusCode: 200,
        message: "User Created Successfully",
        data: result,
    });
});
exports.userSignupControler = userSignupControler;
// user login
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_service_1.userLoginService)(req.body);
    const { refreshToken } = result, others = __rest(result, ["refreshToken"]);
    const cookieOptions = {
        secure: config_1.default.env === "production",
        httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.send({
        success: true,
        statusCode: 200,
        message: "User Logged in Successfully",
        data: others,
    });
});
exports.userLoginController = userLoginController;
// refresh token controller
const refreshTokenUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield (0, user_service_1.refreshTokenUserService)(refreshToken);
    const cookieOptions = {
        secure: config_1.default.env === "production",
        httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.send({
        success: true,
        statusCode: 200,
        message: "New Access token generated Successfully",
        data: result,
    });
});
exports.refreshTokenUserController = refreshTokenUserController;
// Get all user
const getAllUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_service_1.getAllUser)();
    res.send({
        success: true,
        statusCode: 200,
        message: "Users Retrieved succesfully",
        data: result,
    });
});
exports.getAllUserController = getAllUserController;
// get single user
const getSingleUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_service_1.getSingleUser)(req.params.id);
    if (!result) {
        res.send({
            success: false,
            statusCode: 400,
            message: "User not found",
            data: null,
        });
    }
    else {
        res.send({
            success: true,
            statusCode: 200,
            message: "User Retrieved Successfully",
            data: result,
        });
    }
});
exports.getSingleUserController = getSingleUserController;
// delete user
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_service_1.deleteUser)(req.params.id);
    res.send({
        success: true,
        statusCode: 200,
        message: "User Ueleted Successfully",
        data: result,
    });
});
exports.deleteUserController = deleteUserController;
// update user
const updateUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const payload = req.body;
        const result = yield (0, user_service_1.updateUser)(id, payload);
        res.send({
            success: true,
            statusCode: 200,
            message: "User Updated Successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserController = updateUserController;
// my profile
const myProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield (0, user_service_1.getMyProfileService)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!result) {
        res.send({
            success: false,
            statusCode: 400,
            message: "User not found",
            data: null,
        });
    }
    else {
        res.send({
            success: true,
            statusCode: 200,
            message: "User Retrieved Successfully",
            data: result,
        });
    }
});
exports.myProfileController = myProfileController;
// update user
const myProfileUpdateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const payload = req.body;
        const result = yield (0, user_service_1.updateUser)((_b = req.user) === null || _b === void 0 ? void 0 : _b.id, payload);
        res.send({
            success: true,
            statusCode: 200,
            message: "User Updated Successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.myProfileUpdateController = myProfileUpdateController;
