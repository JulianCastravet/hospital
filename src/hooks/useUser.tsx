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
  };

  const [user, _setUser] = useState<User>(emptyUser);

  const setUser = (u: User) => {
    _setUser(u);
  };

  const isAuthenticated: boolean = JSON.parse(
    localStorage.getItem("isAuthenticated") ?? "false"
  );

  const users: User [] = JSON.parse(localStorage.getItem('users')?? '[]')

  return { user, users, isAuthenticated, setUser };
};
