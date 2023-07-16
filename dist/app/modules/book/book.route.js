"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_conroller_1 = require("./book.conroller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_validation_1 = require("./book.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Create new book
router.post("/books", (0, auth_1.default)(), (0, validateRequest_1.default)(book_validation_1.bookZodValidation), book_conroller_1.bookCreateControler);
// get all book
router.get("/books", book_conroller_1.getAllBookController);
// get single Book
router.get("/books/:id", book_conroller_1.getSingleBookController);
// delete Book
router.delete("/books/:id", (0, auth_1.default)(), book_conroller_1.deleteBookController);
// update Book
router.patch("/books/:id", (0, auth_1.default)(), (0, validateRequest_1.default)(book_validation_1.bookUpdateZodValidation), book_conroller_1.updateBookController);
router.post("/review/:id", (0, auth_1.default)(), book_conroller_1.reviewController);
exports.default = router;
