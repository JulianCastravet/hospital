import { create } from "zustand";

const patientsStore = create((set: any) => ({
  patients: 0,
  addPatient: () => set((state: any) => ({ patients: state.patients + 1 })),
}));
