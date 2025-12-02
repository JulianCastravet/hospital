import { getEnvKey } from "./utils/getEnvKey";

const localEnv = {
  API_BASE: getEnvKey("REACT_APP_LOCALHOST_BE"),
  RADAR_API_KEY: getEnvKey("REACT_APP_RADAR_API_KEY"),
};

const prodEnv = {
  API_BASE: getEnvKey("REACT_APP_VERCEL_BE"),
  RADAR_API_KEY: getEnvKey("REACT_APP_RADAR_API_KEY_PUBLIC"),
};

const env = process.env.NODE_ENV === "production" ? prodEnv : localEnv;

export default env;
