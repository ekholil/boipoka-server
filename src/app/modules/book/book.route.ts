import express from "express";
import {
  bookCreateControler,
  reviewController,
  deleteBookController,
  getAllBookController,
  getSingleBookController,
  updateBookController,
} from "./book.conroller";
import validateRequest from "../../middlewares/validateRequest";
import { bookUpdateZodValidation, bookZodValidation } from "./book.validation";
import auth from "../../middlewares/auth";
const router = express.Router();

// Create new book
router.post(
  "/books",
  auth(),
  validateRequest(bookZodValidation),
  bookCreateControler
);

// get all book
router.get("/books", getAllBookController);

// get single Book
router.get("/books/:id", getSingleBookController);

// delete Book
router.delete("/books/:id", auth(), deleteBookController);

// update Book
router.patch(
  "/books/:id",
  auth(),
  validateRequest(bookUpdateZodValidation),
  updateBookController
);
router.post("/review/:id", auth(), reviewController);
export default router;
