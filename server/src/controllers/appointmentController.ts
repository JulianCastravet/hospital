import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appts = await Appointment.find();
    res.status(200).json(appts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

export const addAppointment = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, diagnosis } = req.body;

    const appt = new Appointment({
      name,
      phone,
      email,
      diagnosis,
    });

     await appt.save();
    const appts = await Appointment.find();
    res.status(200).json(appts);
  } catch (error) {
    res.status(500).json({ message: "error adding appointment" });
  }
};
