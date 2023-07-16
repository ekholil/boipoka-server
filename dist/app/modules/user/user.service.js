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
exports.getMyProfileService = exports.updateUser = exports.deleteUser = exports.getSingleUser = exports.getAllUser = exports.refreshTokenUserService = exports.userLoginService = exports.createUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const http_status_2 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// create a user
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload;
    const hashed = bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rount));
    payload.password = yield hashed;
    const newUser = yield user_model_1.User.create(payload);
    return newUser;
});
exports.createUser = createUser;
// user login
const userLoginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = payload;
    const user = yield user_model_1.User.findOne({ email }, { password: 1, name: 1, email: 1 }).lean();
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Exist");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Wrong Password");
    }
    const accessToken = jsonwebtoken_1.default.sign({
        id: user._id,
        email: user.email,
    }, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.expires_in,
    });
    const refreshToken = jsonwebtoken_1.default.sign({
        id: user._id,
        email: user.email,
    }, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.refresh_expires_in,
    });
    return {
        accessToken,
        refreshToken,
        name: user.name,
        email: user.email,
        id: user._id
    };
});
exports.userLoginService = userLoginService;
// Refresh token user service
const refreshTokenUserService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifedToken = null; // Define the type as JwtPayload | null
    try {
        verifedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh token");
    }
    const { id } = verifedToken;
    const isUserExist = yield user_model_1.User.findOne({ _id: id });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const newAccessToken = jsonwebtoken_1.default.sign({
        id: isUserExist.id,
    }, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.expires_in,
    });
    return {
        accessToken: newAccessToken,
    };
});
exports.refreshTokenUserService = refreshTokenUserService;
// get all user
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({});
    return users;
});
exports.getAllUser = getAllUser;
// get single user
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleUser = yield user_model_1.User.findById(id);
    return singleUser;
});
exports.getSingleUser = getSingleUser;
// delete user
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield user_model_1.User.findByIdAndDelete(id);
    return deletedUser;
});
exports.deleteUser = deleteUser;
// update user
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_2.default.NOT_FOUND, "User Not Found");
    }
    const { name, password } = payload, userData = __rest(payload, ["name", "password"]);
    const updatedUserData = Object.assign({}, userData);
    if (password) {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        updatedUserData.password = hashedPassword;
    }
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedUserData[nameKey] = name[key];
        });
    }
    try {
        const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, { $set: updatedUserData }, {
            new: true,
        });
        if (!result) {
            return new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
        }
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUser = updateUser;
// get single user
const getMyProfileService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleUser = yield user_model_1.User.findById(id).select("name phoneNumber address");
    return singleUser;
});
exports.getMyProfileService = getMyProfileService;
