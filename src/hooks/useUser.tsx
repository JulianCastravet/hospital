import { useEffect, useState } from "react";
import { User } from "../context/authContext";
import { addUser as _addUser, getAllUsers } from "../api/user";

export const useUser = () => {
  useEffect(() => {
    getAllUsers().then((u) => setUsers(u));
  }, []);

  const emptyUser: User = {
    type: "",
    name: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    password: "",
  };

  const [user, _setUser] = useState<User>(emptyUser);
  const [users, setUsers] = useState<User[]>([]);

  const setUser = (u: User) => {
    _setUser(u);
  };

  const isAuthenticated: boolean = JSON.parse(
    localStorage.getItem("isAuthenticated") ?? "false"
  );

  const addUser = (u: User) => {
    _addUser(u);
  };

  return { user, users, isAuthenticated, setUser, addUser };
};
