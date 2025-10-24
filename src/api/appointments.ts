import { Appointment } from "../data";
import environment from "../environment";

export const getAllAppointments = async (): Promise<Appointment[]> => {
  const res = await fetch(`${environment.localApi}appointments`);
  if (!res.ok) throw new Error("error fetching appointments");
  return res.json();
};

export const getAppointmentById = async (id: number): Promise<Appointment> => {
  const res = await fetch(`${environment.localApi}appointments/${id}`);
  if (!res.ok) throw new Error("sometthing wrong with this appointment");
  return res.json();
};

export const addAppointment = async (
  app: Appointment
): Promise<Appointment[]> => {
  const res = await fetch(environment.localApi, {
    method: "POST",
    body: JSON.stringify(app),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("error adding appointment");
  return res.json();
};

export const deleteAppointment = async (id: string): Promise<Appointment[]> => {
  const res = await fetch(`${environment.localApi}appointments/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("error deleting appointment");

  return res.json();
};

export const updateAppointment = async (
  id: string,
  body: Appointment
): Promise<Appointment[]> => {
  const res = await fetch(`${environment.localApi}appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("error updating appointment");
  return res.json();
};
