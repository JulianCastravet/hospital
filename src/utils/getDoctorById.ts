import { User } from "../types";

export const getDoctorById = (id: string, users: User[]): User | undefined => {
  return users && users.find((user) => user._id === id);
};
