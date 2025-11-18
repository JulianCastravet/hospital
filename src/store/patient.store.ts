import { create } from "zustand";
import { MessageInstance } from "antd/es/message/interface";
import { User, Disease, Appointment } from "../types";
import { addPatientDiagnose, addPatientAppointment } from "../api/user";
import { devtools, persist } from "zustand/middleware";

type PatientStoreState = {
  user: User | null;
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
};

export const usePatientStore = create<PatientStoreState>()(
  devtools(
    persist(
      (set) => {
        return {
          user: null,
          loading: false,
          error: null,

          addDiagnose: async ({ id, body }, message) => {
            set({ loading: true });
            try {
              const updated = await addPatientDiagnose(id, body, message);
              set({ user: updated, loading: false });
            } catch {
              set({ loading: false, error: "Failed to add diagnose" });
            }
          },

          addAppointment: async ({ id, body }, message) => {
            set({ loading: true });
            try {
              const updated = await addPatientAppointment(id, body, message);
              set({ user: updated, loading: false });
            } catch {
              set({ loading: false, error: "Failed to add appointment" });
            }
          },
        };
      },
      { name: "PatientStore" }
    ),
    { name: "PatientStore" }
  )
);
