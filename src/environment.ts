const { LOCALHOST_BE, VERCEL_BE } = process.env;
const env = {
  API_BASE:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4001" // local backend
      : "https://hospital-server-theta-nine.vercel.app", // Vercel backend
};
export default env;
