import express from "express";
import {
  addAppointment,
  getAllAppointments,
} from "../controllers/appointmentController";

const router = express.Router();

router.get("/getAllAppointments", getAllAppointments);
router.post("/", addAppointment);

export default router;
