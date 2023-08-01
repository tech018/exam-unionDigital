import express from "express";
import bootstrap from "./bootstrap";

/**
 * Initialize Express Application
 */
export const application: express.Application = express();

/**
 * Initialize Application Bootstrap
 */
bootstrap(application);
