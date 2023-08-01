import { Types } from "mongoose";

export interface ITodoList {
  title: string;
  slug: string;
}

export interface ResponseTodo {
  data: {
    title: string;
    slug: string;
    createdAt: Date;
    deletedAt: Date;
    _id: Types.ObjectId;
    __v: number;
  };
  message: string;
}
