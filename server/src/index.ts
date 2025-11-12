import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import appointmentsRoutes from "./routes/appointmentsRoutes";
import reportRoutes from "./routes/reportsRoutes";

import path = require("path");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI || "")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// const __dirnamePath = path.resolve();
// const buildPath = path.join(__dirnamePath, "../build");

// app.use((_, res) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });

app.get("/", (_req, res) => res.send("Backend running 🚀"));
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/reports", reportRoutes);

// app.use(express.static(buildPath));
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
