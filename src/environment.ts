const env = {
  API_BASE:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4001" // local backend
      : "https://hospital-server-pied.vercel.app/api", // Vercel backend
};
export default env;
