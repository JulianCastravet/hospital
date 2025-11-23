import { create } from "zustand";
import { MessageInstance } from "antd/es/message/interface";
import { Disease, Appointment, User } from "../types";
import {
  addPatientDiagnose,
  addPatientAppointment,
  addPatientDocument,
  deleteUserDocument,
  getPatientsByPage,
  deleteUser,
} from "../api/user";
import { devtools, persist } from "zustand/middleware";
import { useUserStore } from "./user.store";

type PatientStoreState = {
  loading: boolean;
  error: string | null;
  patients: User[];
  totalPatients: number;

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

  getPatientsByPage: (
    { page, pageSize }: { page: number; pageSize: number },
    message: MessageInstance
  ) => Promise<void>;

  addPatient: (user: User) => void;
  deletePatient: (id: string, message: MessageInstance) => void;
};

export const usePatientStore = create<PatientStoreState>()(
  devtools(
    persist(
      (set) => {
        return {
          loading: false,
          error: null,
          patients: [],
          totalPatients: 0,

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

          getPatientsByPage: async ({ page, pageSize }, message) => {
            set({ loading: true });
            try {
              const data = await getPatientsByPage({ page, pageSize }, message);
              set({
                loading: false,
                patients: data.users,
                totalPatients: data.totalPatients,
              });
            } catch (error) {
              set({ loading: false });
              throw error;
            }
          },
          addPatient: (user: User) =>
            set((state) => ({ patients: [...state.patients, user] })),

          deletePatient: async (id, message) => {
            set({ loading: true });
            const patients = await deleteUser(id, message);

            const filteredPatients = patients.filter(
              (patient) => patient._id !== id
            );
            set({ patients: filteredPatients, loading: false });
          },
        };
      },
      { name: "PatientStore" }
    ),
    { name: "PatientStore" }
  )
);
