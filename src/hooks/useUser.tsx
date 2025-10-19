import { useState } from "react";
import { User } from "../context/authContext";
import { addUser as _addUser} from "../api/user";

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

  // getAllUsers().then((users) => setUsers(users));

  return { user, users, isAuthenticated, setUser, addUser };
};
