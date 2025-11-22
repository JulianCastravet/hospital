import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment." });
  }
};

export const getAllAppointmentsByPage = async (req: Request, res: Response) => {
  try {
    const { page, pageSize } = req.params;
    const num_page = Number(page);
    const num_pageSize = Number(pageSize);

    const skippedAppts = (num_page - 1) * num_pageSize;

    const appointments = await Appointment.find()
      .skip(skippedAppts)
      .limit(num_pageSize);

    const appts = await Appointment.find();

    res.status(200).json({ totalCount: appts.length, appointments });
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
