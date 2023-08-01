import { Response } from "express";
import toModules from "./todo";
import Model from "../models/mongo_todo";
import { ValidatedRequest } from "express-joi-validation";
import { todoIdRequestSchema } from "../schema/todos";

const mockRequest = (params: any) => {
  const req = {} as ValidatedRequest<todoIdRequestSchema>;
  req.params = params;
  return req;
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../models/mongo_todo");

describe("todoDelete", () => {
  it('should return a 200 response with "Successfully deleted" when todo is deleted', async () => {
    const todoId = "todo123";
    const req = mockRequest({ todoId });
    const res = mockResponse();

    (Model.remove as jest.Mock).mockResolvedValue(true);

    await toModules.todoDelete(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: "Successfully deleted" });
  });

  it('should return a 404 response with "Id not found" when todo is not found', async () => {
    const todoId = "nonExistingTodoId";
    const req = mockRequest({ todoId });
    const res = mockResponse();

    (Model.remove as jest.Mock).mockResolvedValue(false);

    await toModules.todoDelete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: "Id not found" });
  });

  it('should return a 500 response with "Internal server error" when an error occurs', async () => {
    const todoId = "todo123";
    const req = mockRequest({ todoId });
    const res = mockResponse();

    (Model.remove as jest.Mock).mockRejectedValue(
      new Error("Database connection error")
    );

    await toModules.todoDelete(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: "Internal server error" });
  });
});
