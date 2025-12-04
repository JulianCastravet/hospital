import { MessageInstance } from "antd/es/message/interface";
import { http } from "./httpLayer";
import env from "../environment";

export const getMessagesByPatientID = (
  { patientId, doctorId }: { patientId: string; doctorId: string },
  message: MessageInstance
): Promise<any> => {
  return http<any>(
    `${env.API_BASE}/users/${patientId}/messages?secondUserID=${doctorId}`,
    {
      method: "GET",
      headers: {},
    },
    message,
    "FrontEndError"
  );
};
