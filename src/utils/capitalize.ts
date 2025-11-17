export const capitalize = (str: string | undefined): string => {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1);
};
