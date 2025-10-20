import { User } from "../context/authContext";

const errorMsg = "Ups! Something went wrong :(";

export const getAllUsers = async () => {
  const res = await fetch(`http://localhost:4000/users/getAllUsers`);

  if (!res.ok) {
    throw new Error(errorMsg);
  }
  return res.json();
};

export const getPatients = async (): Promise<User[]> => {
  const res = await fetch(`http://localhost:4000/users/getPatients`);
  if (!res.ok) throw new Error(errorMsg);
  return res.json();
};

export const getSingleUser = async (id: string): Promise<User> => {
  const res = await fetch(`http://localhost:4000/users/${id}`);
  if (!res.ok) throw new Error(errorMsg);
  return res.json();
};

export const addUser = async (user: User) => {
  const res = await fetch(`http://localhost:4000/users/`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(errorMsg);
  return res.json();
};

export const userLoginRequest = async (v: {
  mail: string;
  password: string;
}): Promise<any> => {
  const res = await fetch(`http://localhost:4000/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(v),
  });

  if (!res.ok) throw new Error("user cant sign in");

  return res.json();
};

export const updateUser = async (id: string, body: Partial<User>) => {
  const res = await fetch(`http://localhost:4000/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(errorMsg);
  return res.json();
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`http://localhost:4000/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "text",
    },
  });

  if (!res.ok) throw Error(errorMsg);
  return res.json();
};

