import { useState } from "react";
import { User } from "../context/authContext";

export const useUser = () => {
  const emptyUser: User = {
    type: "",
    name: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    password: "",
    id: 0,
  };

  const [user, _setUser] = useState<User>(emptyUser);

  const setUser = (u: User) => {
    _setUser(u);
  };

  const isAuthenticated: boolean = JSON.parse(
    localStorage.getItem("isAuthenticated") ?? "false"
  );

  const addUser = (u: User) => {
    users.push(u);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const users: User[] = JSON.parse(localStorage.getItem("users") ?? "[]");

  return { user, users, isAuthenticated, setUser, addUser };
};
