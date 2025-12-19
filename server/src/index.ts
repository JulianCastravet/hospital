import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes";
import appointmentsRoutes from "./routes/appointmentsRoutes";
import reportRoutes from "./routes/reportsRoutes";
import healthRoutes from "./routes/healthRoutes";
import environment from "./environment";
import errorHandler from "./middleware/errorHandler";

import { createServer } from "http";
import { setupWebSocket } from "./websocket/websocket";

const app = express();

const server = createServer(app);

// ---------- MONGOOSE CONNECTION ----------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log(" MongoDB Connected");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
    process.exit(1);
  }
};

connectDB(); // <--- connect ONCE here
// -----------------------------------------
// WEBSOCKET INIT
setupWebSocket(server);

app.use(cors());
app.use(express.json());

// ---------- ROUTES ----------
app.use("/users", userRoutes);
app.use("/appointments", appointmentsRoutes);
app.use("/reports", reportRoutes);
app.use("/health", healthRoutes);

// Base endpoint (NO DB logic here)
app.get("/", (_req, res) => {
  res.status(200).json({ db: "MongoDB Connected", api: "API running" });
});

// Health check
app.get("/health", (_req, res) => {
  const dbState = mongoose.connection.readyState; // 1 = connected
  const dbConnected = dbState === 1;

  if (!dbConnected) {
    return res.status(500).json({ status: "error", dbConnected: false });
  }

  return res.status(200).json({ status: "ok", dbConnected: true });
});

app.use(errorHandler);

// Start server only in local mode
if (environment.NODE_ENV === "local") {
  server.listen(environment.PORT, () => {
    console.log(`🚀 Server running on port: ${environment.PORT}`);
  });
}

export default app;
