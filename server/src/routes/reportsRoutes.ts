import express from "express";
import {
  addReport,
  getAllReports,
  updateReport,
  deleteReport,
} from "../controllers/reportController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getAllReports);
router.post("/", addReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

export default router;
