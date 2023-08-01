import mongoose from "mongoose";
import Errors from "http-errors";
import { BaseDocument, BaseModel, SchemaDefinition } from "./mongo_base";
import { MESSAGES } from "../middlewares/i18n/types";

export interface ITodo extends BaseDocument {
  title: string;
  slug: string;
}

declare module "./mongo_base" {
  interface BaseModel<T> {
    // Add new methods to class ...
    getDetails: (todoId: string) => Promise<ITodo>;
    findBySlug: (slug: string) => Promise<ITodo>;
  }
}

/** Find Model & Greet by Title */
BaseModel.prototype.getDetails = async function (
  todoId: string
): Promise<ITodo> {
  const todo: ITodo | null = await this.model.findById(todoId);
  console.log("todo: ", todo);
  if (!todo) throw new Errors.NotFound(MESSAGES.MODEL_NOT_FOUND);
  return todo;
};

/** Find Model By Slug */
BaseModel.prototype.findBySlug = async function (slug: string): Promise<ITodo> {
  const todo: ITodo | null = await this.model.findOne({ slug });
  if (!todo) throw new Errors.NotFound(MESSAGES.MODEL_NOT_FOUND);
  return todo;
};

// -----------------------------------------------------------------------------------
// ---------------------- Your MongoDB Schema Model Definition -----------------------
// -----------------------------------------------------------------------------------
const definition: SchemaDefinition = {
  title: { type: mongoose.Schema.Types.String, required: true },
  slug: { type: mongoose.Schema.Types.String },
};

const baseModel = new BaseModel<ITodo>(definition, "todo");

export default baseModel;
