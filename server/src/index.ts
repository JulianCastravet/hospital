import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes";
import appointmentsRoutes from "./routes/appointmentsRoutes";
import reportRoutes from "./routes/reportsRoutes";
import environment from "./environment";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(environment.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/users", userRoutes);
app.use("/appointments", appointmentsRoutes);
app.use("/reports", reportRoutes);

app.get("/", (_req, res) => {
  res.status(200).json({ message: "API running" });
});

app.get("/health", (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbConnected = dbState === 1;

  if (!dbConnected) {
    return res
      .status(500)
      .json({ status: "error", dbConnected: false });
  }

  return res.status(200).json({ status: "ok", dbConnected: true });
});

if (process.env.NODE_ENV === "local") {
  app.listen(environment.PORT, () => {
    console.log(`Server running on port: ${environment.PORT}`);
  });
}

export default app;
