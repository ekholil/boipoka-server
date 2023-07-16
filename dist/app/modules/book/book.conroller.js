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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = exports.updateBookController = exports.deleteBookController = exports.getSingleBookController = exports.getAllBookController = exports.bookCreateControler = void 0;
const book_service_1 = require("./book.service");
// Create New Book
const bookCreateControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = req.body;
    const user = req.user;
    book.creatorId = user === null || user === void 0 ? void 0 : user.id;
    const result = yield (0, book_service_1.createBook)(book);
    res.send({
        success: true,
        statusCode: 200,
        message: "Book Created Successfully",
        data: result,
    });
});
exports.bookCreateControler = bookCreateControler;
// Get all books
const getAllBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield (0, book_service_1.getAllBook)(req.query);
    res.send({
        success: true,
        statusCode: 200,
        message: `${(_a = result === null || result === void 0 ? void 0 : result.meta) === null || _a === void 0 ? void 0 : _a.total} Books Found`,
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.result,
    });
});
exports.getAllBookController = getAllBookController;
// get single Book
const getSingleBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, book_service_1.getSingleBook)(req.params.id);
    if (!result) {
        res.send({
            success: false,
            statusCode: 400,
            message: "Book not found",
            data: null,
        });
    }
    else {
        res.send({
            success: true,
            statusCode: 200,
            message: "Book Retrieved Successfully",
            data: result,
        });
    }
});
exports.getSingleBookController = getSingleBookController;
// delete Book
const deleteBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield (0, book_service_1.deleteBook)(req.params.id, user);
    res.send({
        success: true,
        statusCode: 200,
        message: "Book Ueleted Successfully",
        data: result,
    });
});
exports.deleteBookController = deleteBookController;
// update Book
const updateBookController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const payload = req.body;
        const user = req.user;
        const result = yield (0, book_service_1.updateBook)(id, payload, user);
        res.send({
            success: true,
            statusCode: 200,
            message: "Book Updated Successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateBookController = updateBookController;
const reviewController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const payload = req.body;
        const result = yield (0, book_service_1.bookReviewService)(id, payload);
        res.send({
            success: true,
            statusCode: 200,
            message: "review posted",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.reviewController = reviewController;
