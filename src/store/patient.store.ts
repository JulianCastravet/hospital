import { create } from "zustand";
import { MessageInstance } from "antd/es/message/interface";
import { Disease, Appointment, User } from "../types";
import {
  addPatientDiagnose,
  addPatientAppointment,
  addPatientDocument,
  deleteUserDocument,
} from "../api/user";
import { devtools, persist } from "zustand/middleware";
import { useUserStore } from "./user.store";

type PatientStoreState = {
  loading: boolean;
  error: string | null;

  addDiagnose: (
    params: { id: string; body: Disease },
    message: MessageInstance
  ) => Promise<void>;

  addAppointment: (
    params: { id: string; body: Appointment },
    message: MessageInstance
  ) => Promise<void>;

  uploadDocument: (
    params: { id: string; formData: FormData },
    message: MessageInstance
  ) => Promise<User | undefined>;

  deleteDocument: (
    { userId, docId }: { userId: string; docId: string },
    message: MessageInstance
  ) => Promise<User | undefined>;
};

export const usePatientStore = create<PatientStoreState>()(
  devtools(
    persist(
      (set) => {
        return {
          loading: false,
          error: null,

          addDiagnose: async ({ id, body }, message) => {
            set({ loading: true });
            try {
              const updated = await addPatientDiagnose(id, body, message);
              useUserStore.getState().setUser(updated);
              set({ loading: false });
            } catch {
              set({ loading: false, error: "Failed to add diagnose" });
            }
          },

          addAppointment: async ({ id, body }, message) => {
            set({ loading: true });
            try {
              const updated = await addPatientAppointment(id, body, message);
              useUserStore.getState().setUser(updated);
              set({ loading: false });
            } catch {
              set({ loading: false, error: "Failed to add appointment" });
            }
          },

          uploadDocument: async ({ id, formData }, message) => {
            set({ loading: true });
            try {
              const updated = await addPatientDocument(id, formData, message);
              useUserStore.getState().setUser(updated);
              set({ loading: false });
              return updated;
            } catch {
              set({ loading: false, error: "Failed to add diagnose" });
            }
          },

          deleteDocument: async ({ userId, docId }, message) => {
            set({ loading: true });

            try {
              const user = await deleteUserDocument({ userId, docId }, message);

              useUserStore.getState().setUser(user);
              set({ loading: false });

              return user; // <-- Promise resolved
            } catch (error) {
              set({ loading: false, error: "Failed delete document" });
              throw error; // <-- MUST rethrow so AntD waits and shows spinner
            }
          },
        };
      },
      { name: "PatientStore" }
    ),
    { name: "PatientStore" }
  )
);
