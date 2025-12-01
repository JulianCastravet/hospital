import { devtools, persist } from "zustand/middleware";
import { Appointment } from "../types";
import { MessageInstance } from "antd/es/message/interface";
import { create } from "zustand";
import {
  getAllAppointmentsByPage as _getAllAppointmentsByPage,
  getAppointmentById as _getAppointmentById,
  addAppointment as _addAppointment,
  deleteAppointment as _deleteAppointment,
  updateAppointment as _updateAppointment,
} from "../api/appointments";

export type AppointmentStore = {
  appointment: Appointment | null;
  appointments: Appointment[];
  totalAppointments: number;

  appointmentsLoading: boolean;
  getAllAppointmentsByPage: (
    { page, pageSize }: { page: number; pageSize: number },
    message: MessageInstance
  ) => void;

  getAppointmentById: (id: string, message: MessageInstance) => void;

  addAppointment: (body: Appointment, message: MessageInstance) => void;

  updateAppointment: (
    id: string,
    body: Appointment,
    message: MessageInstance
  ) => void;

  deleteAppointment: (id: string, message: MessageInstance) => void;
};

export const useAppointmentStore = create<AppointmentStore>()(
  devtools(
    persist(
      (set) => ({
        appointment: null,
        appointments: [],
        appointmentsLoading: false,
        totalAppointments: 0,
        getAllAppointmentsByPage: async ({ page, pageSize }, message) => {
          set({ appointmentsLoading: true });

          try {
            const data = await _getAllAppointmentsByPage(
              { page, pageSize },
              message
            );
            set((state) => ({
              ...state,
              appointments: data.appointments,
              totalAppointments: data.totalCount,
            }));

            set({ appointmentsLoading: false });
          } catch (error) {
            set({ appointmentsLoading: false });
            throw error;
          }
        },

        getAppointmentById: async (id: string, message: MessageInstance) => {
          set({ appointmentsLoading: true });

          try {
            const appointment = await _getAppointmentById(id, message);
            set({ appointment });
            set({ appointmentsLoading: false });
          } catch (error) {
            set({ appointmentsLoading: false });
            throw error;
          }
        },
        addAppointment: async (body: Appointment, message: MessageInstance) => {
          set({ appointmentsLoading: true });

          try {
            const appointments = await _addAppointment(body, message);
            set({ appointments });
            set({ appointmentsLoading: false });
          } catch (error) {
            set({ appointmentsLoading: false });
            throw error;
          }
        },
        updateAppointment: async (
          id: string,
          body: Appointment,
          message: MessageInstance
        ) => {
          set({ appointmentsLoading: true });

          try {
            const appointments = await _updateAppointment(id, body, message);
            set({ appointments });
            set({ appointmentsLoading: false });
          } catch (error) {
            set({ appointmentsLoading: false });
            throw error;
          }
        },
        deleteAppointment: async (id: string, message: MessageInstance) => {
          set({ appointmentsLoading: true });

          try {
            const appointments = await _deleteAppointment(id, message);
            set({ appointments });
            set({ appointmentsLoading: false });
          } catch (error) {
            set({ appointmentsLoading: false });
            throw error;
          }
        },
      }),
      { name: "AppointmentStore" }
    ),

    { name: "AppointmentStore" }
  )
);
