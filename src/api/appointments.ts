import { MessageInstance } from "antd/es/message/interface";
import { Appointment } from "../types";
import env from "../environment";

export const getAllAppointments = async (
  message: MessageInstance
): Promise<Appointment[]> => {
  const res = await fetch(`${env.API_BASE}/appointments`);
  if (!res.ok) {
    message.error("Failed fetching appointments.");
  }
  return res.json();
};

export const getAppointmentById = async (
  id: number,
  message: MessageInstance
): Promise<Appointment> => {
  const res = await fetch(`${env.API_BASE}/appointments/${id}`);
  if (!res.ok) message.error(`Failed fetching appointment with ID: ${id}`);
  return res.json();
};

export const addAppointment = async (
  app: Appointment,
  message: MessageInstance
): Promise<Appointment[]> => {
  const res = await fetch(`${env.API_BASE}/appointments`, {
    method: "POST",
    body: JSON.stringify(app),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) message.error("Error adding appointment.");
  return res.json();
};

export const deleteAppointment = async (
  id: string,
  message: MessageInstance
): Promise<Appointment[]> => {
  const res = await fetch(`${env.API_BASE}/appointments/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) message.error(`Failed deleting appointment with ID: ${id}`);

  return res.json();
};

export const updateAppointment = async (
  id: string,
  body: Appointment,
  message: MessageInstance
): Promise<Appointment[]> => {
  const res = await fetch(`${env.API_BASE}/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) message.error("Error updating appointment");
  return res.json();
};
