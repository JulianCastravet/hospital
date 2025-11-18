import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { MessageInstance } from "antd/es/message/interface";
import { userLoginRequest } from "../api/user";
import { User } from "../types/user";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  userOptions: string[];
  setOption: (p: string[]) => void;

  login: (
    params: { mail: string; password: string },
    message: MessageInstance
  ) => Promise<void>;

  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        userOptions: [],
        setOption: (options: string[]) =>
          set((state: any) => ({ userOptions: [...options] })),

        login: async ({ mail, password }, message) => {
          set({ loading: true, error: null });
          try {
            const data = await userLoginRequest({ mail, password }, message);
            if (data.success) {
              set({
                user: data.user,
                isAuthenticated: true,
                loading: false,
              });
            } else {
              set({ error: "Login failed", loading: false });
            }
          } catch (err) {
            set({ loading: false, error: "Network error" });
          }
        },

        logout: () => {
          set({ user: null, isAuthenticated: false });
        },
      }),
      { name: "auth-store" }
    ),
    { name: "auth-store" }
  )
);
