"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path")); // ✅ use ES import syntax
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const appointmentsRoutes_1 = __importDefault(require("./routes/appointmentsRoutes"));
const reportsRoutes_1 = __importDefault(require("./routes/reportsRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";
// ===== MIDDLEWARES =====
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ===== DATABASE CONNECTION =====
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
// ===== API ROUTES =====
app.use("/api/users", userRoutes_1.default);
app.use("/api/appointments", appointmentsRoutes_1.default);
app.use("/api/reports", reportsRoutes_1.default);
// ===== SERVE REACT BUILD (for local build) =====
const buildPath = path_1.default.resolve(__dirname, "../../build"); // ✅ correct relative path
app.use(express_1.default.static(buildPath));
// ===== REACT ROUTER FALLBACK =====
app.use((req, res) => {
    res.sendFile(path_1.default.join(buildPath, "index.html"));
});
// ===== ROOT TEST ROUTE (optional) =====
app.get("/health", (_req, res) => res.send("Backend running 🚀"));
// ===== START SERVER =====
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`Serving React build from: ${buildPath}`);
});
