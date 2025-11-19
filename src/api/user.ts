import { MessageInstance } from "antd/es/message/interface";
import { Appointment, Disease, User } from "../types";
import { http } from "./httpLayer";
import { NewUser } from "../types/user";
import env from "../environment";

export const getAllUsers = (message: MessageInstance) =>
  http<User[]>(
    `${env.API_BASE}/users/getAllUsers`,
    {},
    message,
    "Failed fetching users"
  );

export const getPatients = (message: MessageInstance) =>
  http<User[]>(
    `${env.API_BASE}/users/getPatients`,
    {},
    message,
    "Failed fetching patients"
  );

export const getSingleUser = (id: string, message: MessageInstance) =>
  http<User | null>(
    `${env.API_BASE}/users/${id}`,
    {},
    message,
    `Failed to fetch user with ID: ${id}`
  );

export const addUser = (user: NewUser, message: MessageInstance) =>
  http<User>(
    `${env.API_BASE}/users/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    },
    message,
    "Failed to add user"
  );

export const userLoginRequest = (
  payload: { mail: string; password: string },
  message: MessageInstance
) =>
  http<any>(
    `${env.API_BASE}/users/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    message,
    "Failed to log in"
  );

export const updateUser = (
  id: string,
  data: Partial<User>,
  message: MessageInstance
) =>
  http<User>(
    `${env.API_BASE}/users/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    message,
    "Failed to update user"
  );

export const deleteUser = (id: string, message: MessageInstance) =>
  http<User[]>(
    `${env.API_BASE}/users/${id}`,
    { method: "DELETE" },
    message,
    "Failed to delete user"
  );

export const updateUserAvatar = (
  id: string,
  formData: FormData,
  message: MessageInstance
) =>
  http<User>(
    `${env.API_BASE}/users/${id}/avatar`,
    {
      method: "POST",
      body: formData,
    },
    message,
    "Failed to update avatar"
  );

export const deleteUserAvatar = (id: string, message: MessageInstance) =>
  http<User>(
    `${env.API_BASE}/users/${id}/avatar`,
    {
      method: "DELETE",
    },
    message,
    "Failed to delete avatar"
  );

export const addPatientDiagnose = (
  id: string,
  disease: Disease,
  message: MessageInstance
) =>
  http<User>(
    `${env.API_BASE}/users/${id}/diagnose`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(disease),
    },
    message,
    "Failed to add diagnose"
  );

export const addPatientAppointment = (
  id: string,
  appointment: Appointment,
  message: MessageInstance
) =>
  http<User>(
    `${env.API_BASE}/users/${id}/appointments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointment),
    },
    message,
    "Failed to add appointment"
  );
