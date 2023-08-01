import { NextFunction, Request, Response } from "express";
import Errors from "http-errors";
import Model from "../models/mongo_todo";
import { QueryData } from "../models/mongo_base";
import { ResponseTodo } from "../interface/todoList";
import { ValidatedRequest } from "express-joi-validation";
import {
  createTodoRequestSchema,
  todoIdRequestSchema,
  todoListRequestSchema,
} from "../schema/todos";

const toModules = {
  async todoCreate(
    req: ValidatedRequest<createTodoRequestSchema>,
    res: Response
  ): Promise<Response> {
    try {
      const { title, slug } = req.body;
      const result = await Model.add({
        title,
        slug,
      });
      if (result)
        return res
          .status(201)
          .send({ data: result, message: `Successfully Created` });
      return res.status(400).send({ message: "Something error in our end" });
    } catch (err) {
      return res.status(500).send({ message: "Internal server errror" });
    }
  },
  async todoList(
    req: ValidatedRequest<todoListRequestSchema>,
    res: Response
  ): Promise<Response> {
    try {
      const query = req.query;
      const result = await Model.list(query);

      if (result) return res.status(200).send({ data: result });
      return res.status(404).json({ message: "Empty records" });
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  },
  async details(
    req: ValidatedRequest<todoIdRequestSchema>,
    res: Response
  ): Promise<Response> {
    try {
      const { todoId } = req.params;
      const result = await Model.getDetails(todoId);

      if (result) return res.status(200).send({ data: result });
      return res.status(404).send({ message: "Not found" });
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  },
  async todoUpdate(
    req: ValidatedRequest<todoIdRequestSchema>,
    res: Response
  ): Promise<Response> {
    try {
      const { todoId } = req.params;
      const data = req.body;
      const result = await Model.updateById(todoId, data);
      if (result) return res.status(200).send("Successfully updated");
      return res.status(400).send({ message: "Unable to update" });
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  },
  async todoArchive(
    req: ValidatedRequest<todoIdRequestSchema>,
    res: Response
  ): Promise<Response> {
    try {
      const { todoId } = req.params;
      const result = await Model.softDelete(todoId);
      if (result)
        return res.status(200).send({ message: "Successfully updated" });
      return res.status(404).send({ message: "Id not found" });
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  },
  async todoDelete(req: ValidatedRequest<todoIdRequestSchema>, res: Response) {
    try {
      const { todoId } = req.params;
      const result = await Model.remove(todoId);
      if (result)
        return res.status(200).send({ message: "Successfully deleted" });
      return res.status(404).send({ message: "Id not found" });
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  },
};

export default toModules;
