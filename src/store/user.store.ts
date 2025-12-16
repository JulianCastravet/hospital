import { create } from "zustand";
import { MessageInstance } from "antd/es/message/interface";
import { User } from "../types";
import {
  addUser,
  deleteUser,
  deleteUserAvatar,
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserAvatar,
} from "../api/user";
import { devtools, persist } from "zustand/middleware";
import { NewUser } from "../types/user";
import { usePatientStore } from "./patient.store";

type UserStoreState = {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;

  setUser: (u: User| null) => void;

  getUser: (id: string, message: MessageInstance) => Promise<void>;
  getUsers: (message: MessageInstance) => Promise<void>;
  addUser: (data: NewUser, message: MessageInstance) => Promise<void>;

  updateUser: (
    params: { id: string; data: Partial<User> },
    message: MessageInstance
  ) => Promise<void>;

  updateAvatar: (
    params: { id: string; data: FormData },
    message: MessageInstance
  ) => Promise<void>;
  deleteUser: (id: string, message: MessageInstance) => void;
  deleteAvatar: (id: string, message: MessageInstance) => void;
};

export const useUserStore = create<UserStoreState>()(
  devtools(
    persist(
      (set) => {
        return {
          user: null,
          users: [],
          loading: false,
          error: null,

          setUser: (user) => set({ user }),

          getUser: async (id, message) => {
            set({ loading: true });
            try {
              const user = await getSingleUser(id, message);
              set({ user, loading: false });
            } catch {
              set({ loading: false, error: "Failed to load user" });
            }
          },

          getUsers: async (message) => {
            set({ loading: true });
            try {
              const users = await getAllUsers(message);
              set({ users, loading: false });
            } catch {
              set({ loading: false, error: "Failed to load users" });
            }
          },
          addUser: async (data: NewUser, message: MessageInstance) => {
            set({ loading: true, error: null });
            try {
              const newUser = await addUser(data, message);

              usePatientStore.getState().addPatient(newUser);
              set({
                loading: false,
              });
            } catch {
              set({ loading: false, error: "Failed to add user" });
            }
          },

          updateUser: async ({ id, data }, message) => {
            set({ loading: true });
            try {
              const updated = await updateUser(id, data, message);
              set({ user: updated, loading: false });
            } catch {
              set({ loading: false, error: "Failed to update user" });
            }
          },

          updateAvatar: async ({ id, data }, message) => {
            set({ loading: true });
            try {
              const updated = await updateUserAvatar(id, data, message);
              set({ user: updated, loading: false });
            } catch {
              set({ loading: false, error: "Failed to update avatar" });
            }
          },

          deleteUser: async (id, message) => {
            set({ loading: true });
            try {
              const updated = await deleteUser(id, message);
              set({ users: updated, loading: false });
            } catch {
              set({ loading: false, error: "Failed to delete user" });
            }
          },

          deleteAvatar: async (id, message) => {
            set((store) => ({
              ...store,
              loading: true,
              user: store.user ? { ...store.user, avatarUrl: "" } : store.user,
            }));
            try {
              const updatedUser = await deleteUserAvatar(id, message);
              set({ user: updatedUser, loading: false });
            } catch (error) {
              set({ loading: false, error: "Failed to delete avatar" });
            }
          },
        };
      },
      { name: "UserStore" }
    ),
    { name: "UserStore" }
  )
);
