import { MessageInstance } from "antd/es/message/interface";
import { Appointment, Disease, User } from "../types";
import { http } from "./httpLayer";
import { NewUser } from "../types/user";

const API_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000" // local backend
    : "https://hospital-two-zeta.vercel.app"; // Vercel backend

export default API_BASE;

export const getAllUsers = (message: MessageInstance) =>
  http<User[]>(
    `${API_BASE}/api/users/getAllUsers`,
    {},
    message,
    "Failed fetching users"
  );

export const getPatients = (message: MessageInstance) =>
  http<User[]>(
    `${API_BASE}/api/users/getPatients`,
    {},
    message,
    "Failed fetching patients"
  );

export const getSingleUser = (id: string, message: MessageInstance) =>
  http<User | null>(
    `${API_BASE}/api/users/${id}`,
    {},
    message,
    `Failed to fetch user with ID: ${id}`
  );

export const addUser = (user: NewUser, message: MessageInstance) =>
  http<User>(
    `${API_BASE}/api/users`,
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
    `${API_BASE}/api/users/login`,
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
    `${API_BASE}/api/users/${id}`,
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
    `${API_BASE}/api/users/${id}`,
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
    `${API_BASE}/api/users/${id}/avatar`,
    {
      method: "POST",
      body: formData,
    },
    message,
    "Failed to update avatar"
  );

export const addPatientDiagnose = (
  id: string,
  disease: Disease,
  message: MessageInstance
) =>
  http<User>(
    `${API_BASE}/api/users/${id}/diagnose`,
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
    `${API_BASE}/api/users/${id}/appointments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointment),
    },
    message,
    "Failed to add appointment"
  );
