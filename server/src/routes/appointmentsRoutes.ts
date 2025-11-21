import express from "express";
import {
  addAppointment,
  deleteAppointment,
  getAllAppointments,
  updateAppointment,
} from "../controllers/appointmentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getAllAppointments);
router.post("/", addAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
export default router;
