import dotenv from "dotenv";

dotenv.config();

type Environment = {
  NODE_ENV: string;
  PORT?: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  CLOUDINARY_CLOUD_NAME?: string;
  CLOUDINARY_API_KEY?: string;
  CLOUDINARY_API_SECRET?: string;
  CLOUDINARY_URL?: string;
};

const mustGetEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const NODE_ENV = process.env.NODE_ENV || "local";

const devConfig: Environment = {
  NODE_ENV,
  PORT: Number(process.env.PORT) || 4001,
  MONGO_URI: mustGetEnv("MONGO_URI_QA"),
  JWT_SECRET: mustGetEnv("JWT_SECRET"),
};

const prodConfig: Environment = {
  NODE_ENV,
  MONGO_URI: mustGetEnv("MONGO_URI"),
  JWT_SECRET: mustGetEnv("JWT_SECRET"),
  CLOUDINARY_CLOUD_NAME: mustGetEnv("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: mustGetEnv("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: mustGetEnv("CLOUDINARY_API_SECRET"),
  CLOUDINARY_URL: mustGetEnv("CLOUDINARY_URL"),
};

const environment: Environment = NODE_ENV === "local" ? devConfig : prodConfig;

export default environment;
