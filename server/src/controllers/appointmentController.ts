import { NextFunction, Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { appointmentSchema } from "../validation/schemas";
import { AppError } from "../errors/AppError";

export const getAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      throw new AppError("Appointment not found", 404);
    }

    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

export const getAllAppointmentsByPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(error);
  }
};

export const addAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = appointmentSchema.safeParse(req.body);

    if (!parsed.success) {
      const details = parsed.error.flatten().fieldErrors;
      throw new AppError("Invalid appointment data", 400, details);
    }

    const appt = new Appointment(parsed.data);

    await appt.save();
    const appts = await Appointment.find();

    res.status(200).json(appts);
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedBody = req.body;

    await Appointment.findByIdAndUpdate(id, updatedBody, { new: true });

    const appts = await Appointment.find();

    res.status(200).json(appts);
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await Appointment.findByIdAndDelete(id);

    const appts = await Appointment.find();

    res.status(200).json(appts);
  } catch (error) {
    next(error);
  }
};
