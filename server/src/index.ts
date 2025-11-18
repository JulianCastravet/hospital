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

app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/reports", reportRoutes);

//images
app.use("/uploads", express.static("uploads"));

app.get("/", (_req, res) => res.send("Backend running 🚀"));

if (process.env.NODE_ENV === "local") {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}

export default app;
