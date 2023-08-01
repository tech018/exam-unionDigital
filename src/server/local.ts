import express from "express";
import bootstrap from "./bootstrap";
import connectToDB from "../database/mongo";

/**
 * Initialize Express Application
 */
const application: express.Application = express();

/**
 * Initialize Application Bootstrap
 */
bootstrap(application);
const PORT = `${process.env.PORT}`;

/**
 * Start Local Server
 */

application.listen(PORT, async (): Promise<void> => {
  await connectToDB();
  const message = `Exam Server Started at port ${PORT}`;
  console.log(message);
});
