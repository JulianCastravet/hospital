import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export const formatTime = (
  value: string,
  format = "DD/MM/YYYY HH:mm"
): string => {
  if (!value) {
    return "";
  }

  dayjs.extend(utc);
  return dayjs.utc(value).format(format).toString();
};
