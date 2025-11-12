import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path"; // ✅ use ES import syntax

import userRoutes from "./routes/userRoutes";
import appointmentsRoutes from "./routes/appointmentsRoutes";
import reportRoutes from "./routes/reportsRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json());

// ===== DATABASE CONNECTION =====
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ===== API ROUTES =====
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/reports", reportRoutes);

// ===== SERVE REACT BUILD (for local build) =====
const buildPath = path.resolve(__dirname, "../../build"); // ✅ correct relative path
app.use(express.static(buildPath));

// ===== REACT ROUTER FALLBACK =====
app.use((req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ===== ROOT TEST ROUTE (optional) =====
app.get("/health", (_req, res) => res.send("Backend running 🚀"));

// ===== START SERVER =====
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`Serving React build from: ${buildPath}`);
});
