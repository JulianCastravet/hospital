import { MessageInstance } from "antd/es/message/interface";
import { Report } from "../types";
import env from "../environment";
import { http } from "./httpLayer";

export const getAllReports = (message: MessageInstance): Promise<Report[]> =>
  http<Report[]>(
    `${env.API_BASE}/reports`,
    {},
    message,
    "Failed fetching all reports."
  );

export const addReport = (
  report: Report,
  message: MessageInstance
): Promise<Report[]> =>
  http<Report[]>(
    `${env.API_BASE}/reports`,
    {
      method: "POST",
      body: JSON.stringify(report),
      headers: {
        "Content-type": "application/json",
      },
    },
    message,
    "Failed to add new report."
  );

export const updateReport = (
  id: string,
  body: Partial<Report>,
  message: MessageInstance
): Promise<Report[]> =>
  http<Report[]>(
    `${env.API_BASE}/reports/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    },
    message,
    "Failed to update report."
  );

export const deleteReport = (
  id: string,
  message: MessageInstance
): Promise<Report[]> =>
  http<Report[]>(
    `${env.API_BASE}/reports/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "text",
      },
    },
    message,
    `Failed to delete report with ID: ${id}`
  );
