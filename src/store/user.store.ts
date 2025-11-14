import { create } from "zustand";
import { User } from "../context/authContext";
import {
  updateUser as _updateUser,
  getSingleUser,
  updateUserAvatar as _updateUserAvatar,
} from "../api/user";
import { MessageInstance } from "antd/es/message/interface";

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
};

// const { message } = App.useApp();
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
  };
});
