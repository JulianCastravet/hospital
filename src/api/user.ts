import { MessageInstance } from "antd/es/message/interface";
import { Appointment, Disease, User } from "../types";

export const getAllUsers = async (message: MessageInstance) => {
  const res = await fetch(`/api/users/getAllUsers`);

  if (!res.ok) message.error("Failed fetching all users.");
  return res.json();
};

export const getPatients = async (
  message: MessageInstance
): Promise<User[]> => {
  const res = await fetch(`/api/users/getPatients`);
  if (!res.ok) message.error("Failed fetching all patients.");
  return res.json();
};

export const getSingleUser = async (
  id: string,
  message: MessageInstance
): Promise<User | null> => {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) {
    message.error(`Failed to fetch user with ID: ${id}`);
    return null;
  }
  return res.json();
};

export const addUser = async (user: User, message: MessageInstance) => {
  const res = await fetch(`/api/users/`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) message.error(`Failed to add user.`);
  return res.json();
};

export const userLoginRequest = async (
  v: {
    mail: string;
    password: string;
  },
  message: MessageInstance
): Promise<any> => {
  const res = await fetch(`/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(v),
  });

  if (!res.ok) message.error("Failed to log in.", 5);

  return res.json();
};

export const updateUser = async (
  id: string,
  body: Partial<User>,
  message: MessageInstance
) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) message.error("Failed to update user.");
  return res.json();
};

export const deleteUser = async (id: string, message: MessageInstance) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "text",
    },
  });

  if (!res.ok) message.error("Failed to delete user.");
  return res.json();
};

export const updateUserAvatar = async (
  id: string,
  formData: FormData,
  message: MessageInstance
) => {
  try {
    const res = await fetch(`/api/users/${id}/avatar`, {
      method: "POST",
      body: formData,
    });

    return res.json();
  } catch (error) {
    message.error("Failed to update avatar.");
  }
};

export const addPatientDiagnose = async (
  id: string,
  disease: Disease,
  message: MessageInstance
) => {
  try {
    const res = await fetch(`/api/users/${id}/diagnose`, {
      method: "POST",
      body: JSON.stringify(disease),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) message.error("Failed to add diagnose.");
    return res.json();
  } catch (error) {
    message.error("Ups. Try Again!");
  }
};

export const addPatientAppointment = async (
  id: string,
  appointment: Appointment,
  message: MessageInstance
) => {
  try {
    const res = await fetch(`/api/users/${id}/appointments`, {
      method: "POST",
      body: JSON.stringify(appointment),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) message.error("Failed to add appointment.");
    return res.json();
  } catch (error) {
    message.error("Ups. Try Again!");
  }
};
