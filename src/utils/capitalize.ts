export const capitalize = (str: string | undefined): string => {
  if (!str) return "";

  const trimmed = str.trim();

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};
