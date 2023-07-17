import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBook } from "./book.interface";
import { Book } from "./book.model";
import httpstatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

// create a Book
export const createBook = async (payload: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(payload);
  return newBook;
};

// get all Book
export const getAllBook = async (query: any) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "price",
      sortOrder = "asc",
      minPrice,
      maxPrice,
      location,
      searchTerm,
    } = query;

    const filters: any = {};

    if (minPrice) {
      filters.price = { $gte: Number(minPrice) };
    }

    if (maxPrice) {
      filters.price = { ...filters.price, $lte: Number(maxPrice) };
    }

    if (location) {
      filters.location = location;
    }

    const searchFields = ["location", "breed", "category"];

    if (searchTerm) {
      filters.$or = searchFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      }));
    }

    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    const totalItems = await Book.countDocuments(filters);

    const result = await Book.find(filters)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      meta: {
        page,
        limit,
        total: totalItems,
      },
      result,
    };
  } catch (error) {
    console.error("Error retrieving Book listings:", error);
  }
};

// get single Book
export const getSingleBook = async (id: string) => {
  const singleBook = await Book.findById(id);
  return singleBook;
};

// delete Book
export const deleteBook = async (id: string, user: JwtPayload | null) => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpstatus.NOT_FOUND, "Book Not Found");
  }

  if (isExist.creatorId !== user?.id) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
  }
  const deletedBook = await Book.findByIdAndDelete(id);
  return deletedBook;
};

// update Book
export const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  user: JwtPayload | null
) => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpstatus.NOT_FOUND, "Book Not Found");
  }
  console.log(isExist.creatorId, user?.id);
  if (isExist.creatorId !== user?.id) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
  }
  try {
    const result = await Book.findOneAndUpdate(
      { _id: id },
      { $set: payload },
      {
        new: true,
      }
    );
    if (!result) {
      return new ApiError(httpStatus.NOT_FOUND, "Book Not Found");
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

// update Book
export const bookReviewService = async (id: string, payload: any) => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpstatus.NOT_FOUND, "Book Not Found");
  }
  try {
    const result = await Book.updateOne(
      { _id: id },
      { $push: { reveiws: payload } }
    );
    if (!result.modifiedCount) {
      return new ApiError(
        httpStatus.NOT_FOUND,
        "Book Not Found or post review failed"
      );
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};
