import express from "express";
import {
  getAppointmentById,
  addAppointment,
  deleteAppointment,
  getAllAppointmentsByPage,
  updateAppointment,
} from "../controllers/appointmentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getAllAppointmentsByPage);
router.post("/", addAppointment);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
export default router;
