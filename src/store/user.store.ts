import { create } from "zustand";
import {
  updateUser as _updateUser,
  getSingleUser,
  updateUserAvatar as _updateUserAvatar,
  getAllUsers,
  addPatientDiagnose,
  addPatientAppointment,
} from "../api/user";
import { MessageInstance } from "antd/es/message/interface";
import { Appointment, Disease, User } from "../types";
import { message } from "antd";

type UserState = {
  user: User | null;
  users: User[];
  getUser: (id: string, message: MessageInstance) => void;
  updateUser: (id: string, u: User, message: MessageInstance) => void;
  updateAvatar: (
    id: string,
    formData: FormData,
    message: MessageInstance
  ) => void;
  getUsers: (message: MessageInstance) => void;
  addDiagnose: (id: string, u: Disease, message: MessageInstance) => void;
  addAppointment: (
    id: string,
    u: Appointment,
    message: MessageInstance
  ) => void;
};

export const useUserStore = create<UserState>((set) => {
  return {
    user: null,
    users: [],

    getUser: (id: string, message) => {
      getSingleUser(id, message).then((user) => {
        if (user) set({ user });
        else set({ user: null });
      });
    },

    updateUser: (id: string, u: User, message) => {
      _updateUser(id, u, message).then((user) => {
        if (user) set({ user });
      });
    },

    updateAvatar: (id: string, formData: FormData, message) => {
      _updateUserAvatar(id, formData, message).then((user) => {
        if (user) set({ user });
      });
    },

    getUsers(message) {
      getAllUsers(message).then((users) => {
        set({ users });
      });
    },

    addDiagnose: (id: string, body: Disease, message: MessageInstance) => {
      addPatientDiagnose(id, body, message).then((user) => set({ user }));
    },
    addAppointment: (
      id: string,
      appointment: Appointment,
      message: MessageInstance
    ) => {
      addPatientAppointment(id, appointment, message).then((user) =>
        set({ user })
      );
    },
  };
});
