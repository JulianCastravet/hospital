import express from "express";
import {
  addAppointment,
  deleteAppointment,
  getAllAppointments,
  updateAppointment
} from "../controllers/appointmentController";

const router = express.Router();

router.get("/", getAllAppointments);
router.post("/", addAppointment);
router.put('/:id', updateAppointment)
router.delete('/:id', deleteAppointment)
export default router;
