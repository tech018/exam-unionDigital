import { Response } from "express";
import toModules from "./todo";
import Model from "../models/mongo_todo";
import { ValidatedRequest } from "express-joi-validation";
import { createTodoRequestSchema } from "../schema/todos";
import { QueryData } from "../models/mongo_base";

describe("todoCreate", () => {
  const req = {
    body: { title: "Test Todo", slug: "test-todo" },
  } as ValidatedRequest<createTodoRequestSchema>;
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a todo item and return a success response", async () => {
    const createdTodo = { title: "Test Todo", slug: "test-todo" };

    jest.spyOn(Model, "add").mockResolvedValueOnce(createdTodo);

    await toModules.todoCreate(req, res);

    expect(Model.add).toHaveBeenCalledTimes(1);
    expect(Model.add).toHaveBeenCalledWith({
      title: "Test Todo",
      slug: "test-todo",
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      data: createdTodo,
      message: "Successfully Created",
    });
  });

  it("should handle unsuccessful todo creation and return an error response", async () => {
    (Model.add as jest.Mock).mockResolvedValueOnce(null);

    await toModules.todoCreate(req, res);

    expect(Model.add).toHaveBeenCalledTimes(1);
    expect(Model.add).toHaveBeenCalledWith({
      title: "Test Todo",
      slug: "test-todo",
    });

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Something error in our end",
    });
  });
  it("should handle internal server error and return a 500 response", async () => {
    (Model.add as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    await toModules.todoCreate(req, res);

    expect(Model.add).toHaveBeenCalledTimes(1);
    expect(Model.add).toHaveBeenCalledWith({
      title: "Test Todo",
      slug: "test-todo",
    });

    expect(res.status).toBeCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Internal server errror",
    });
  });
});
