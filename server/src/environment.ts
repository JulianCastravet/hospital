const devConfig = {
  PORT: process.env.PORT || 4001,
  MONGO_URI: process.env.MONGO_URI_QA,
};
const prodConfig = {
  PORT: "",
  MONGO_URI: process.env.MONGO_URI,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
};

const environment =
  process.env.NODE_ENV === "local" ? { ...devConfig } : { ...prodConfig };

export default environment;
