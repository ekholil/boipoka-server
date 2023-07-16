import { Response, Request, NextFunction } from "express";
import {
  createBook,
  deleteBook,
  getAllBook,
  getSingleBook,
  updateBook,
  bookReviewService,
} from "./book.service";

// Create New Book
export const bookCreateControler = async (req: Request, res: Response) => {
  const book = req.body;
  const user = req.user;
  book.creatorId = user?.id;
  const result = await createBook(book);
  res.send({
    success: true,
    statusCode: 200,
    message: "Book Created Successfully",
    data: result,
  });
};

// Get all books
export const getAllBookController = async (req: Request, res: Response) => {
  const result = await getAllBook(req.query);
  res.send({
    success: true,
    statusCode: 200,
    message: `${result?.meta?.total} Books Found`,
    meta: result?.meta,
    data: result?.result,
  });
};

// get single Book
export const getSingleBookController = async (req: Request, res: Response) => {
  const result = await getSingleBook(req.params.id);
  if (!result) {
    res.send({
      success: false,
      statusCode: 400,
      message: "Book not found",
      data: null,
    });
  } else {
    res.send({
      success: true,
      statusCode: 200,
      message: "Book Retrieved Successfully",
      data: result,
    });
  }
};

// delete Book
export const deleteBookController = async (req: Request, res: Response) => {
  const user = req.user;
  const result = await deleteBook(req.params.id, user);
  res.send({
    success: true,
    statusCode: 200,
    message: "Book Ueleted Successfully",
    data: result,
  });
};

// update Book
export const updateBookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const user = req.user;
    const result = await updateBook(id, payload, user);
    res.send({
      success: true,
      statusCode: 200,
      message: "Book Updated Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const reviewController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const result = await bookReviewService(id, payload);
    res.send({
      success: true,
      statusCode: 200,
      message: "review posted",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
