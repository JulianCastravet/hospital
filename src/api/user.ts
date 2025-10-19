import { User } from "../context/authContext";

const API = "localhost:4000";
const errorMsg = "Ups! Something went wrong :(";

export const getAllUsers = async () => {
  const res = await fetch(`${API}/users/getAllUsers`);

  if (!res.ok) {
    throw new Error(errorMsg);
  }
  return res.json();
};

export const getSingleUser = async (id: string) => {
  const res = await fetch(`${API}/users/${id}`);
  if (!res.ok) throw new Error(errorMsg);
  return res.json();
};

export const addUser = async (user: User) => {
  const res = await fetch(`${API}/users/`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(errorMsg);
  return res.json();
};

// next to come: update user
