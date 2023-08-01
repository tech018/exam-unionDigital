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

describe("Get Single Details", () => {
  it("should return a 200 response with data when todo is found", async () => {
    const todoId = "todo123";
    const req = mockRequest({ todoId });
    const res = mockResponse();

    const expectedResult = { id: todoId, title: "Todo 1", completed: false };
    (Model.getDetails as jest.Mock).mockResolvedValue(expectedResult);

    await toModules.details(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ data: expectedResult });
  });

  it("should return a 404 response with message when todo is not found", async () => {
    const todoId = "nonExistingTodoId";
    const req = mockRequest({ todoId });
    const res = mockResponse();

    (Model.getDetails as jest.Mock).mockResolvedValue(null);

    await toModules.details(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: "Not found" });
  });

  it("should return a 500 response with message when an error occurs", async () => {
    const todoId = "todo123";
    const req = mockRequest({ todoId });
    const res = mockResponse();

    (Model.getDetails as jest.Mock).mockRejectedValue(
      new Error("Database connection error")
    );

    await toModules.details(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: "Internal server error" });
  });
});
