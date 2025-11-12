import { Report } from "../data";

const ERROR_MSG = "Something wrong :(!";

export const getAllReports = async (): Promise<Report[]> => {
  const res = await fetch(`/api/reports`);

  if (!res.ok) throw new Error(ERROR_MSG);
  return res.json();
};

export const addReport = async (report: Report): Promise<Report[]> => {
  const res = await fetch(`/api/reports`, {
    method: "POST",
    body: JSON.stringify(report),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!res.ok) throw new Error(ERROR_MSG);

  return res.json();
};

export const updateReport = async (id: string, body: Partial<Report>) => {
  const res = await fetch(`/api/reports/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("couldnt update the report");
  return res.json();
};

export const deleteReport = async (id: string): Promise<Report[]> => {
  const res = await fetch(`/api/reports/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "text",
    },
  });
  if (!res.ok) throw Error("delete failed");
  return res.json();
};
