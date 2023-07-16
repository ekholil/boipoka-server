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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookReviewService = exports.updateBook = exports.deleteBook = exports.getSingleBook = exports.getAllBook = exports.createBook = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const book_model_1 = require("./book.model");
const http_status_2 = __importDefault(require("http-status"));
// create a Book
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield book_model_1.Book.create(payload);
    return newBook;
});
exports.createBook = createBook;
// get all Book
const getAllBook = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, sortBy = "price", sortOrder = "asc", minPrice, maxPrice, location, searchTerm, } = query;
        const filters = {};
        if (minPrice) {
            filters.price = { $gte: Number(minPrice) };
        }
        if (maxPrice) {
            filters.price = Object.assign(Object.assign({}, filters.price), { $lte: Number(maxPrice) });
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
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
        const totalItems = yield book_model_1.Book.countDocuments(filters);
        const result = yield book_model_1.Book.find(filters)
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
    }
    catch (error) {
        console.error("Error retrieving Book listings:", error);
    }
});
exports.getAllBook = getAllBook;
// get single Book
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleBook = yield book_model_1.Book.findById(id);
    return singleBook;
});
exports.getSingleBook = getSingleBook;
// delete Book
const deleteBook = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_2.default.NOT_FOUND, "Book Not Found");
    }
    if (isExist.creatorId !== (user === null || user === void 0 ? void 0 : user.id)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden");
    }
    const deletedBook = yield book_model_1.Book.findByIdAndDelete(id);
    return deletedBook;
});
exports.deleteBook = deleteBook;
// update Book
const updateBook = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_2.default.NOT_FOUND, "Book Not Found");
    }
    console.log(isExist.creatorId, user === null || user === void 0 ? void 0 : user.id);
    if (isExist.creatorId !== (user === null || user === void 0 ? void 0 : user.id)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden");
    }
    try {
        const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, { $set: payload }, {
            new: true,
        });
        if (!result) {
            return new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not Found");
        }
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateBook = updateBook;
// update Book
const bookReviewService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_2.default.NOT_FOUND, "Book Not Found");
    }
    try {
        const result = yield book_model_1.Book.updateOne({ _id: id }, { $push: { reveiws: payload } });
        if (!result.modifiedCount) {
            return new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not Found or post review failed");
        }
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.bookReviewService = bookReviewService;
