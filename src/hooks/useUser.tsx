import { useState } from "react";
import { User } from "../context/authContext";
import {
  addUser as _addUser,
  updateUser as _updateUser,
  getUserAvatar,
  updateUserAvatar,
} from "../api/user";

export const useUser = () => {
  const emptyUser: User = {
    type: "",
    name: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    password: "",
    age: 0,
    avatarUrl: "",
    _id: "",
  };

  const [user, _setUser] = useState<User>(emptyUser);
  const [users] = useState<User[]>([]);

  const setUser = (u: User) => {
    _setUser(u);
  };

  const addUser = (u: User) => {
    _addUser(u);
  };

  const updateUser = (id: string, u: User) => {
    _updateUser(id, u);
  };

  const updateAvatar = (id: string, blob: FormData) => {
    updateUserAvatar(id, blob);
  };


  return { user, users, setUser, addUser, updateUser, updateAvatar };
};
