import express from "express";
import {
  getAppointmentById,
  addAppointment,
  deleteAppointment,
  getAllAppointmentsByPage,
  updateAppointment,
} from "../controllers/appointmentController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/roleMiddleware";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getAllAppointmentsByPage);
router.post("/",requireRole('doctor'), addAppointment);
router.get("/:id", getAppointmentById);
router.put("/:id", requireRole("doctor"), updateAppointment);
router.delete("/:id", requireRole("doctor"), deleteAppointment);
export default router;
