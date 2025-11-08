import { useState } from "react";
import { User } from "../context/authContext";
import { addUser as _addUser } from "../api/user";

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
  const [users, setUsers] = useState<User[]>([]);

  const setUser = (u: User) => {
    _setUser(u);
  };

  const addUser = (u: User) => {
    _addUser(u);
  };

  return { user, users, setUser, addUser, setUsers };
};
