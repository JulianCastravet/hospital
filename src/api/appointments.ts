import { Appointment } from "../data";

const API = "localhost:4000";

export const getAllAppointments = async (): Promise<Appointment[]> => {
  const res = await fetch(`${API}/appointments/getAllAppointments`);
  if (!res.ok) throw new Error("error fetching appointments");
  return res.json();
};

export const getAppointmentById = async (id: number): Promise<Appointment> => {
  const res = await fetch(`${API}/appointments/${id}`);
  if (!res.ok) throw new Error("sometthing wrong with this appointment");
  return res.json();
};

export const addAppointment = async (
  app: Appointment
): Promise<Appointment[]> => {
  const res = await fetch(`${API}/appointments/`, {
    method: "POST",
    body: JSON.stringify(app),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const deleteAppointment = async (id: number): Promise<Appointment[]> => {
  const res = await fetch(`${API}/appointments/${id}`, {
    method: "DELETE",
    body: JSON.stringify(id),
  });
  if (!res.ok) throw new Error("error deleting appointment");

  return res.json();
};

export const updateAppointment = async (
  id: number,
  body: Appointment
): Promise<Appointment> => {
  const res = await fetch(`${API}/appointments/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("error updating appointment");
  return res.json();
};
