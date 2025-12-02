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
  reportsLoading: boolean;
  reportsQuantity: number;
  getAllReports: (
    { page, pageSize }: { page: number; pageSize: number },
    message: MessageInstance
  ) => void;
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
          reportsLoading: true,
          reportsQuantity: 0,
          getAllReports: ({ page, pageSize }, message) => {
            try {
              set({ reportsLoading: true });
              getAllReports({ page, pageSize }, message).then((data) => {
                set({
                  reports: data.reports,
                  reportsQuantity: data.reportsQty,
                  reportsLoading: false,
                });
              });
            } catch (error) {
              set({ reportsLoading: false });
            }
          },
          addReport: (report, message) => {
            try {
              set({ reportsLoading: true });
              addReport(report, message).then((reports) =>
                set({ reports, reportsLoading: false })
              );
            } catch (error) {
              set({ reportsLoading: false });
            }
          },
          updateReport: (id, body, message) => {
            try {
              set({ reportsLoading: true });
              updateReport(id, body, message).then((reports) =>
                set({ reports, reportsLoading: false })
              );
            } catch (error) {
              set({ reportsLoading: false });
            }
          },
          deleteReport: (id, message) => {
            try {
              set({ reportsLoading: true });
              deleteReport(id, message).then((reports) =>
                set({ reports, reportsLoading: false })
              );
            } catch (error) {
              set({ reportsLoading: false });
            }
          },
        };
      },
      { name: "ReportStore" }
    ),
    { name: "ReportStore" }
  )
);
