import { Appointment } from "../data";

export const getAllAppointments = async (): Promise<Appointment[]> => {
  const res = await fetch(`http://localhost:4000/appointments`);
  if (!res.ok) throw new Error("error fetching appointments");
  return res.json();
};

export const getAppointmentById = async (id: number): Promise<Appointment> => {
  const res = await fetch(`http://localhost:4000/appointments/${id}`);
  if (!res.ok) throw new Error("sometthing wrong with this appointment");
  return res.json();
};

export const addAppointment = async (
  app: Appointment
): Promise<Appointment[]> => {
  const res = await fetch(`http://localhost:4000/appointments/`, {
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
  const res = await fetch(`http://localhost:4000/appointments/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("error deleting appointment");

  return res.json();
};

export const updateAppointment = async (
  id: string,
  body: Appointment
): Promise<Appointment[]> => {
  const res = await fetch(`http://localhost:4000/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("error updating appointment");
  return res.json();
};
