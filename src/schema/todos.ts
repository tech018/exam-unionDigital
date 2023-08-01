import * as Joi from "joi";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

//create todos schema
export interface createTodoRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    title: string;
    slug: string;
  };
}
//joi validation schema
export const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().required(),
});

//get id request for delete, update and get single data
export interface todoIdRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    todoId: string;
  };
}

export const todoIdSchema = Joi.object({
  todoId: Joi.string(),
});

export interface todoListRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    page: number;
    size: number;
    sortType?: string;
    deletedAt?: number;
  };
}

export const todoListSchema = Joi.object({
  todoId: Joi.string(),
  page: Joi.number().required(),
  size: Joi.number().required(),
  sortType: Joi.string(),
  deletedAt: Joi.number(),
});
