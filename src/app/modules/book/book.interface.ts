import { Types } from "mongoose";

type reviewType = {
  name: string;
  review: string;
};
export type IBook = {
  creatorId: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: number;
  reveiws?: reviewType[];
};
