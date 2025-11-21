const {
  REACT_APP_LOCALHOST_BE,
  REACT_APP_VERCEL_BE,
  REACT_APP_RADAR_API_KEY,
  REACT_APP_RADAR_API_KEY_PUBLIC,
} = process.env;

const localEnv = {
  API_BASE: REACT_APP_LOCALHOST_BE,
  RADAR_API_KEY: REACT_APP_RADAR_API_KEY,
};

const prodEnv = {
  API_BASE: REACT_APP_VERCEL_BE,
  RADAR_API_KEY: REACT_APP_RADAR_API_KEY_PUBLIC,
};

const env = process.env.NODE_ENV === "production" ? prodEnv : localEnv;

export default env;
