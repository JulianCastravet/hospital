import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import appointmentsRoutes from "./routes/appointmentsRoutes";
import reportRoutes from "./routes/reportsRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/users", userRoutes);
app.use("/appointments", appointmentsRoutes);
app.use("/reports", reportRoutes);

app.get("/", async (_req, res) => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        res.status(200).json({ message: "MongoDB Connected" });
      })
      .catch((error) => {
        console.log("NO Database with error: ", error);
      });
  } catch (error) {
    res.status(500).json({ message: "DB is not connected" });
  }
});

if (process.env.NODE_ENV === "local") {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}

export default app;
