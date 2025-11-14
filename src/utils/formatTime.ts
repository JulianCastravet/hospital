import dayjs from "dayjs";

export const formatTime = (
  value: string,
  format = "DD/MM/YYYY HH:MM"
): string => {
  if (!value) {
    return "";
  }

  return dayjs(value).format(format);
};
