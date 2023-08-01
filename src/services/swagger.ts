// Open http://<app_host>:<app_port>/api/docs in your browser to view the documentation.
import swaggerJSDoc from "swagger-jsdoc";
import config from "../config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const myPackage = require("../../package.json");
const { name, version, description, license, author } = myPackage;

const { SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT } = config.env;
const url = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api`;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: name,
    version,
    description,
    license: {
      name: license,
      url: "https://www.linkedin.com/in/joseph-aguilar-61660619b/",
    },
    contact: { name: author, email: "sojda018@gmail.com" },
  },
  servers: [{ url: `${url}/todo` }],
  // basePath: '/v1',
  // schemes: ['http', 'https'],
  consumes: ["application/json"],
  produces: ["application/json"],
  // host: url, // Host (optional)
  // securityDefinitions: {
  //   JWT: {
  //       type: 'apiKey',
  //       in: 'header',
  //       name: 'Authorization',
  //       description: "JWT Token for user's authorization",
  //   }
  // }
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition: swaggerDefinition,
  // Path files to be processes. for: {openapi: '3.0.0'}
  apis: [
    "./src/routes/*.ts",
    "./src/models/*.ts",
    "./dist/routes/*.js",
    "./dist/models/*.js",
  ],
  // files: ['../routes/*.js', '../models/*.js'],  // Path files to be processes. for: {swagger: '2.0'}
  // basedir: __dirname, //app absolute path
  // onValidateError: (errors, req, res, next) => { // global handler for validation errors
  //   res.status(400).send(errors)
  // },
};

const specs = swaggerJSDoc(options);
module.exports = specs;
