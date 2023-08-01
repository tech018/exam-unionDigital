import { ConfigModel, EnvironmentModel } from "./types";

const env = JSON.parse(JSON.stringify(process.env)) as EnvironmentModel;

const config: ConfigModel = {
  env,
  regex: {
    objectId: /^[0-9a-fA-F]{24}$/,
  },
  maxPageSizeLimit: 20,

  sortTypes: {
    date: "createdAt",
    name: "name",
  },
};

export default config;
