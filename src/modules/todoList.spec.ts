import { Response } from "express";
import toModules from "./todo";
import Model from "../models/mongo_todo";
import { ValidatedRequest } from "express-joi-validation";
import { todoListRequestSchema } from "../schema/todos";

const mockRequest = (query: any) => {
  const req = {} as ValidatedRequest<todoListRequestSchema>;
  req.query = query;
  return req;
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../models/mongo_todo");

describe("todoList", () => {
  it("should return a 200 response with data when records are found", async () => {
    const query = {};
    const req = mockRequest(query);
    const res = mockResponse();

    const expectedResult = [
      {
        data: {
          total: 1,
          list: [
            {
              title: "Sample todo",
              slug: "todos1",
              createdAt: 1690898967892,
              deletedAt: 0,
            },
          ],
        },
      },
    ];
    (Model.list as jest.Mock).mockResolvedValue(expectedResult);

    await toModules.todoList(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ data: expectedResult });
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return a 404 response with message when no records are found", async () => {
    const query = {
      page: 1,
      size: 10,
    };
    const req = mockRequest(query);
    const res = mockResponse();

    (Model.list as jest.Mock).mockResolvedValue(null);

    await toModules.todoList(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Empty records" });
    expect(res.send).not.toHaveBeenCalled();
  });

  it("should return a 500 response with message when an error occurs", async () => {
    const query = {
      page: 1,
      size: 10,
    };
    const req = mockRequest(query);
    const res = mockResponse();

    (Model.list as jest.Mock).mockRejectedValue(
      new Error("Database connection error")
    );

    await toModules.todoList(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: "Internal server error" });
    expect(res.json).not.toHaveBeenCalled();
  });
});
