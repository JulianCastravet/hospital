import { MessageInstance } from "antd/es/message/interface";
import { Report } from "../types";

export const getAllReports = async (
  message: MessageInstance
): Promise<Report[]> => {
  const res = await fetch(`/api/reports`);

  if (!res.ok) message.error("Failed fetching all reports.");
  return res.json();
};

export const addReport = async (
  report: Report,
  message: MessageInstance
): Promise<Report[]> => {
  const res = await fetch(`/api/reports`, {
    method: "POST",
    body: JSON.stringify(report),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!res.ok) message.error("Failed to add new report.");

  return res.json();
};

export const updateReport = async (
  id: string,
  body: Partial<Report>,
  message: MessageInstance
) => {
  const res = await fetch(`/api/reports/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) message.error("Failed to update report.");
  return res.json();
};

export const deleteReport = async (
  id: string,
  message: MessageInstance
): Promise<Report[]> => {
  const res = await fetch(`/api/reports/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "text",
    },
  });
  if (!res.ok) message.error(`Failed to delete report with ID: ${id}`);
  return res.json();
};
