import { devtools, persist } from "zustand/middleware";
import { Report } from "../types";
import { MessageInstance } from "antd/es/message/interface";
import { create } from "zustand";
import {
  addReport,
  deleteReport,
  getAllReports,
  updateReport,
} from "../api/reports";

type ReportStore = {
  report: Report | null;
  reports: Report[];
  getAllReports: (message: MessageInstance) => void;
  addReport: (report: Report, message: MessageInstance) => void;
  updateReport: (id: string, body: Report, message: MessageInstance) => void;
  deleteReport: (id: string, message: MessageInstance) => void;
};

export const useReportStore = create<ReportStore>()(
  devtools(
    persist(
      (set) => {
        return {
          report: null,
          reports: [],
          getAllReports: (message) => {
            getAllReports(message).then((reports) => set({ reports }));
          },
          addReport: (report, message) => {
            addReport(report, message).then((reports) => set({ reports }));
          },
          updateReport: (id, body, message) => {
            updateReport(id, body, message).then((reports) => set({ reports }));
          },
          deleteReport: (id, message) => {
            deleteReport(id, message).then((reports) => set({ reports }));
          },
        };
      },
      { name: "ReportStore" }
    ),
    { name: "ReportStore" }
  )
);
