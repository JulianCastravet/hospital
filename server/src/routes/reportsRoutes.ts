import express from "express";
import {
  addReport,
  getAllReports,
  updateReport,
  deleteReport
} from "../controllers/reportController";

const router = express.Router();

router.get("/", getAllReports);
router.post("/", addReport);
router.put("/:id", updateReport);
router.delete('/:id', deleteReport)

export default router;
