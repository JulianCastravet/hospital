import { create } from "zustand";

type HospitalTypeStore = {
  patients: number;
  getPatients: () => void;
  doctors: number;
  getDoctors: () => void;
};

const patientsStore = create<HospitalTypeStore>((set: any) => ({
  patients: 0,
  doctors: 0,
  getPatients: () => {},
  getDoctors() {},
}));

export default patientsStore;
