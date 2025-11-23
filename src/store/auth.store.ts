import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { MessageInstance } from "antd/es/message/interface";
import { userLoginRequest } from "../api/user";
import { User } from "../types/user";
import { ApiError } from "../api/httpLayer";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  token: string;
  error: string | null;
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
        token: "",
        error: null,
        setOption: (options: string[]) => {
          set((state) => ({
            ...state,
            user: state.user ? { ...state.user, userSettings: options } : null,
          }));
        },
        login: async ({ mail, password }, message) => {
          set({ loading: true, error: null });
          try {
            const data = await userLoginRequest({ mail, password }, message);
            if (data.success) {
              set({
                user: data.user,
                isAuthenticated: true,
                loading: false,
                token: data.token,
              });

              return data;
            } else {
              set({ error: "Login failed", loading: false });
            }
          } catch (err) {
            if (err instanceof ApiError && err.fieldErrors) {
              const firstFieldMessage =
                Object.values(err.fieldErrors).flat().filter(Boolean)[0] ||
                "Login failed";
              set({ loading: false, error: firstFieldMessage });
            } else if (err instanceof ApiError) {
              set({ loading: false, error: err.message });
            } else {
              set({ loading: false, error: "Network error" });
            }
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

export const authToken = () => useAuthStore.getState().token;
