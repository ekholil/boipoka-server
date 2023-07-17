import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser, IUserLogin } from "./user.interface";
import { User } from "./user.model";
import httpstatus from "http-status";
import config from "../../../config";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IBook } from "../book/book.interface";
import { Book } from "../book/book.model";

// create a user
export const createUser = async (payload: IUser): Promise<IUser | null> => {
  const { password } = payload;
  const hashed = bcrypt.hash(password, Number(config.bcrypt_salt_rount));

  payload.password = await hashed;
  const newUser = await User.create(payload);
  return newUser;
};

// user login
export const userLoginService = async (payload: IUserLogin) => {
  const { password, email } = payload;
  const user = await User.findOne(
    { email },
    { password: 1, name: 1, email: 1 }
  ).lean();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Exist");
  }
  const isPasswordMatch = await bcrypt.compare(password, user?.password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Wrong Password");
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.expires_in,
    }
  );
  const refreshToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.refresh_expires_in,
    }
  );
  return {
    accessToken,
    refreshToken,
    name: user.name,
    email: user.email,
    id: user._id,
  };
};

// add to wishlist
export const addToWishListService = async (
  payload: IBook,
  user: JwtPayload | null
) => {
  const isUserExist = await User.findOne({ _id: user?.id });
  if (!isUserExist) {
    throw new ApiError(httpstatus.NOT_FOUND, "User Not Found");
  }
  try {
    const result = await User.updateOne(
      { _id: user?.id },
      { $push: { wishlist: payload } }
    );
    if (!result.modifiedCount) {
      return new ApiError(
        httpStatus.NOT_FOUND,
        "User Not Found add failed failed"
      );
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

// get wishlist
export const getWishListService = async (user: JwtPayload | null) => {
  const isUserExist = await User.findOne({ _id: user?.id });
  if (!isUserExist) {
    throw new ApiError(httpstatus.NOT_FOUND, "User Not Found");
  }
  return isUserExist.wishlist;
};
// Refresh token user service
export const refreshTokenUserService = async (token: string) => {
  let verifedToken: JwtPayload | null = null; // Define the type as JwtPayload | null

  try {
    verifedToken = jwt.verify(token, config.jwt.secret as Secret) as JwtPayload;
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh token");
  }

  const { id } = verifedToken;

  const isUserExist = await User.findOne({ _id: id });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const newAccessToken = jwt.sign(
    {
      id: isUserExist.id,
    },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.expires_in,
    }
  );

  return {
    accessToken: newAccessToken,
  };
};

// get all user
export const getAllUser = async () => {
  const users = await User.find({});
  return users;
};

// get single user
export const getSingleUser = async (id: string) => {
  const singleUser = await User.findById(id);
  return singleUser;
};

// delete user
export const deleteUser = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

// update user
export const updateUser = async (id: string, payload: Partial<IUser>) => {
  const isExist = await User.findById(id);
  if (!isExist) {
    throw new ApiError(httpstatus.NOT_FOUND, "User Not Found");
  }
  const { name, password, ...userData } = payload;
  const updatedUserData: Partial<IUser> = { ...userData };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updatedUserData.password = hashedPassword;
  }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  try {
    const result = await User.findOneAndUpdate(
      { _id: id },
      { $set: updatedUserData },
      {
        new: true,
      }
    );
    if (!result) {
      return new ApiError(httpStatus.NOT_FOUND, "User Not Found");
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

// get single user
export const getMyProfileService = async (id: string) => {
  const singleUser = await User.findById(id).select("name phoneNumber address");
  return singleUser;
};
