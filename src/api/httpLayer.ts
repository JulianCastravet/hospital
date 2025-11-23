import { MessageInstance } from "antd/es/message/interface";
import { authToken } from "../store/auth.store";

export type ApiFieldErrors = Record<string, string[] | undefined>;

export interface ApiErrorShape {
  message: string;
  statusCode?: number;
  errors?: ApiFieldErrors;
}

export class ApiError extends Error {
  statusCode?: number;
  fieldErrors?: ApiFieldErrors;

  constructor(message: string, statusCode?: number, fieldErrors?: ApiFieldErrors) {
    super(message);
    this.statusCode = statusCode;
    this.fieldErrors = fieldErrors;
  }
}

export const http = async <T>(
  url: string,
  options: RequestInit = {},
  message?: MessageInstance,
  fallbackErrorMsg?: string
): Promise<T> => {
  const token = authToken();

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      let parsedBody: ApiErrorShape | null = null;

      try {
        parsedBody = (await res.json()) as ApiErrorShape;
      } catch {
        // ignore JSON parse errors, fall back to generic
      }

      const mainMessage =
        parsedBody?.message ||
        fallbackErrorMsg ||
        (res.status >= 500
          ? "Something went wrong on the server"
          : "Request failed");

      // show first validation error if available
      const firstFieldMessage =
        parsedBody?.errors &&
        Object.values(parsedBody.errors)
          .flat()
          .filter(Boolean)[0];

      const toastMessage = firstFieldMessage || mainMessage;
      if (message && toastMessage) {
        message.error(toastMessage, 4);
      }

      throw new ApiError(
        mainMessage,
        parsedBody?.statusCode ?? res.status,
        parsedBody?.errors
      );
    }

    // When server returns NO content (204)
    if (res.status === 204) return null as T;

    return (await res.json()) as T;
  } catch (err: any) {
    if (!(err instanceof ApiError)) {
      message?.error("Network error", 4);
    }
    throw err;
  }
};
