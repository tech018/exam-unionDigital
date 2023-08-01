import { Response } from "express";
import toModules from "./todo";
import Model from "../models/mongo_todo";
import { todoIdRequestSchema } from "../schema/todos";

import { ValidatedRequest } from "express-joi-validation";

const mockRequest = (params: any, body: any) => {
  const req = {} as ValidatedRequest<todoIdRequestSchema>;
  req.params = params;
  req.body = body;
  return req;
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../models/mongo_todo");
describe("todoUpdate", () => {
  it('should return a 200 response with "Successfully updated" when update is successful', async () => {
    const todoId = "todo123";
    const data = { title: "Updated Todo", completed: true };
    const req = mockRequest({ todoId }, data);
    const res = mockResponse();

    (Model.updateById as jest.Mock).mockResolvedValue(true);

    await toModules.todoUpdate(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Successfully updated");
  });

  it("should return a 400 response with message when unable to update", async () => {
    const todoId = "todo123";
    const data = { title: "Invalid Data" };
    const req = mockRequest({ todoId }, data);
    const res = mockResponse();

    (Model.updateById as jest.Mock).mockResolvedValue(false);

    await toModules.todoUpdate(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: "Unable to update" });
  });

  it("should return a 500 response with message when an error occurs", async () => {
    const todoId = "todo123";
    const data = { title: "Updated Todo", completed: true };
    const req = mockRequest({ todoId }, data);
    const res = mockResponse();

    (Model.updateById as jest.Mock).mockRejectedValue(
      new Error("Database connection error")
    );

    await toModules.todoUpdate(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: "Internal server error" });
  });
});
