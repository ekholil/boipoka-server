import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Number,
      required: true,
    },
    reveiws: {
      name: {
        type: String,
      },
      review: {
        type: String,
      },
    },
    title: {
      type: String,
      required: true,
    },
    creatorId: {
      required: true,
      type: String,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Book = model<IBook>("Book", bookSchema);
