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
    const appt = new Appointment(req.body);

    await appt.save();
    const appts = await Appointment.find();

    res.status(200).json(appts);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBody = req.body;

    await Appointment.findByIdAndUpdate(id, updatedBody, { new: true });

    const appts = await Appointment.find();

    res.status(200).json(appts);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Appointment.findByIdAndDelete(id);

    const appts = await Appointment.find();

    res.status(200).json(appts);
  } catch (error) {
    res.status(500).json(error);
  }
};
