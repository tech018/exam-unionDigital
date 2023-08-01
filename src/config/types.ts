export interface EnvironmentModel {
  readonly NODE_ENV: string;
  readonly APP_ENV: string;
  readonly JWT_SECRET?: string;
  readonly MONGO_URI: string;
  readonly PORT: number;
  readonly SERVER_PROTOCOL: string;
  readonly SERVER_HOST: string;
  readonly SERVER_PORT: string;
}

export interface StringType {
  [key: string]: string;
}

export interface RegexType {
  [key: string]: RegExp;
}

export interface ConfigModel {
  readonly env: EnvironmentModel;
  readonly regex: RegexType;
  maxPageSizeLimit: number;
  readonly sortTypes: StringType;
}
