export const getEnvKey = (key: string): string => {
  const value = process.env[key];

  if (!value)
    throw new Error(`The key for ${key} is missing. Please provide it.`);

  return value;
};
