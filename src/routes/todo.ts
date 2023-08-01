import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import { createValidator } from "express-joi-validation";
const validator = createValidator();

import TodoModules from "../modules/todo";
import { createTodoSchema, todoIdSchema } from "../schema/todos";

// API Documentation Swagger
import swaggerUi from "swagger-ui-express";
import * as specs from "../services/swagger";
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(specs, { explorer: true }));
router.get("/health", (_req: Request, res: Response) => {
  res.send("200");
});
router
  .route("/")
  .post(validator.body(createTodoSchema), TodoModules.todoCreate)
  .get(TodoModules.todoList);
router
  .route("/:todoId")
  .put(validator.params(todoIdSchema), TodoModules.todoUpdate)
  .delete(validator.params(todoIdSchema), TodoModules.todoDelete)
  .get(validator.params(todoIdSchema), TodoModules.details);

export default router;

// ------ Set Default Components for OpenAPI documentation
/**
 * @openapi
 * tags:
 *   name: Todo
 *   description: Todo management
 * components:
 *   responses:
 *     Success:
 *       description: Successful action
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Success'
 *     BadRequest:
 *       description: Bad request schema
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     NotFound:
 *       description: The specified resource was not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     Unauthorized:
 *       description: Unauthorized access
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *         message:
 *           type: string
 *         body:
 *           type: object
 *       required:
 *         - statusCode
 *         - message
 *       todo:
 *         statusCode: 400
 *         message: 'Some Error ...'
 *         body: null
 *     Success:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Response Status
 *         result:
 *           $ref: '#/components/schemas/todo'
 */

/**
 * @openapi
 * paths:
 *   /:
 *     post:
 *       summary: Create a new todo
 *       tags: [Todo]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/todo'

 *       responses:
 *         "200":
 *           $ref: '#/components/responses/Success'
 *         "400":
 *           $ref: '#/components/responses/BadRequest'
 */

/**
 * @openapi
 * paths:
 *   /:
 *     get:
 *       summary: Get list of all Samples
 *       tags: [Todo]
 *       responses:
 *         "200":
 *           description: Gets a list of samples as an array of objects
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: Response Status
 *                   result:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         list:
 *                           $ref: '#/components/schemas/todo'
 *         "400":
 *           $ref: '#/components/responses/BadRequest'
 */

/**
 * @openapi
 * paths:
 *  /{todoId}:
 *     get:
 *       summary: Todo Details
 *       tags: [Todo]
 *       parameters:
 *         - name: todoId
 *           in: path
 *           description: Sample ID
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           $ref: '#/components/responses/Success'
 *         "400":
 *           $ref: '#/components/responses/BadRequest'
 *         "404":
 *           $ref: '#/components/responses/NotFound'
 */

/**
 * @openapi
 * paths:
 *   /{todoId}:
 *     put:
 *       summary: Todo Update
 *       tags: [Todo]
 *       parameters:
 *         - title: todoId
 *           in: path
 *           description: Todo ID
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           $ref: '#/components/responses/Success'
 *         "400":
 *           $ref: '#/components/responses/BadRequest'
 *         "404":
 *           $ref: '#/components/responses/NotFound'
 */

/**
 * @openapi
 * paths:
 *   /{todoId}:
 *     delete:
 *       summary: Delete Todo
 *       tags: [Todo]
 *       parameters:
 *         - title: todoId
 *           in: path
 *           description: Todo ID
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           $ref: '#/components/responses/Success'
 *         "400":
 *           $ref: '#/components/responses/BadRequest'
 *         "404":
 *           $ref: '#/components/responses/NotFound'
 */

/**
 * @openapi
 * paths:
 *   /{todoId}/secure-action:
 *     post:
 *       summary: Secure Action For Todo
 *       tags: [Todo]
 *       parameters:
 *         - name: sampleId
 *           in: path
 *           description: Sample ID
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           $ref: '#/components/responses/Success'
 *         "400":
 *           $ref: '#/components/responses/BadRequest'
 *         "401":
 *           $ref: '#/components/responses/Unauthorized'
 *         "404":
 *           $ref: '#/components/responses/NotFound'
 */
