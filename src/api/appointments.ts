import { MessageInstance } from "antd/es/message/interface";
import { Appointment } from "../types";
import env from "../environment";
import { http } from "./httpLayer";

export const getAllAppointments = (message: MessageInstance) =>
  http<Appointment[]>(
    `${env.API_BASE}/appointments`,
    {},
    message,
    "Failed fetching appointments."
  );

export const getAppointmentById = (
  id: string,
  message: MessageInstance
): Promise<Appointment> =>
  http<Appointment>(
    `${env.API_BASE}/appointments/${id}`,
    {},
    message,
    `Failed fetching appointment with ID: ${id}`
  );

export const addAppointment = (
  app: Appointment,
  message: MessageInstance
): Promise<Appointment[]> =>
  http<Appointment[]>(
    `${env.API_BASE}/appointments`,
    {
      method: "POST",
      body: JSON.stringify(app),
      headers: {
        "Content-Type": "application/json",
      },
    },
    message,
    "Error adding appointment."
  );

export const deleteAppointment = (
  id: string,
  message: MessageInstance
): Promise<Appointment[]> =>
  http<Appointment[]>(
    `${env.API_BASE}/appointments/${id}`,
    {
      method: "DELETE",
    },
    message,
    `Failed deleting appointment with ID: ${id}`
  );

export const updateAppointment = (
  id: string,
  body: Appointment,
  message: MessageInstance
): Promise<Appointment[]> =>
  http<Appointment[]>(
    `${env.API_BASE}/appointments/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
    message,
    "Error updating appointment"
  );
