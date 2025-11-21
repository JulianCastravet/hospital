import { MessageInstance } from "antd/es/message/interface";
import { authToken } from "../store/auth.store";

export const http = async <T>(
  url: string,
  options: RequestInit = {},
  message?: MessageInstance,
  errorMsg?: string
): Promise<T> => {
  try {
    const token = authToken();

    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) {
      message && message.error(errorMsg || "Unknown error", 4);
      throw new Error(`${errorMsg} (status: ${res.status})`);
    }

    // When server returns NO content (204)
    if (res.status === 204) return null as T;

    return (await res.json()) as T;
  } catch (err) {
    message?.error("Something wrong on backend");
    throw err;
  }
};
