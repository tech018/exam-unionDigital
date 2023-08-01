import "dotenv/config";
import express from "express";
import parser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import TodoRoutes from "../routes/todo";

/**
 * Setup All Endpoint Handlers and Global Middlewares
 *
 * @param application  express.Application
 */

const bootstrap = (application: express.Application): void => {
  application.disable("x-powered-by");
  application.use(cors({ optionsSuccessStatus: 200 }));
  application.use(parser.urlencoded({ extended: true }));
  application.use(parser.json());
  application.use(morgan(`${process.env.ENVIRONMENT}`));

  application.use("/api/todo", TodoRoutes);
};

export default bootstrap;
