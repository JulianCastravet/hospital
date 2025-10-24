import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import appointmentsRoutes from "./routes/appointmentsRoutes";
import reportRoutes from "./routes/reportsRoutes";
import { environment } from "./environment";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = environment.PORT || 4000;
const MONGO_URI = environment.MONGO_URI as string;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (_req, res) => res.send("Backend running 🚀"));
app.use("/users", userRoutes);
app.use("/appointments", appointmentsRoutes);
app.use("/reports", reportRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
