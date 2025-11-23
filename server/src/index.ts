import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes";
import appointmentsRoutes from "./routes/appointmentsRoutes";
import reportRoutes from "./routes/reportsRoutes";
import environment from "./environment";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/appointments", appointmentsRoutes);
app.use("/reports", reportRoutes);

app.get("/", async (_req, res) => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        res.status(200).json({ message: "MongoDB Connected" });
        res.status(200).json({ message: "API running" });
      })
      .catch((error) => {
        console.log("NO Database with error: ", error);
      });
  } catch (error) {
    res.status(500).json({ message: "DB is not connected" });
    process.exit(1);
  }
});

app.get("/health", (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbConnected = dbState === 1;
  console.log("dbConected", dbConnected);

  if (!dbConnected) {
    return res.status(500).json({ status: "error", dbConnected: false });
  }

  return res.status(200).json({ status: "ok", dbConnected: true });
});

app.use(errorHandler);

if (process.env.NODE_ENV === "local") {
  app.listen(environment.PORT, () => {
    console.log(`Server running on port: ${environment.PORT}`);
  });
}

export default app;
