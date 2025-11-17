import { useState } from "react";
import {
  addUser as _addUser,
  updateUser as _updateUser,
  getSingleUser,
  updateUserAvatar,
} from "../api/user";
import { App } from "antd";
import { User } from "../types";

export const useUser = () => {
  const { message } = App.useApp();

  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (u: User) => {
    _addUser(u, message).then((users) => setUsers({ ...users }));
  };

  const updateUser = (id: string, u: User) => {
    _updateUser(id, u, message).then((user) => setUser({ ...user }));
  };

  const updateAvatar = (id: string, blob: FormData) => {
    updateUserAvatar(id, blob, message).then((user) => setUser({ ...user }));
  };

  const getUser = (id: string) => {
    getSingleUser(id || "", message).then((user) => {
      setUser(user ? { ...user } : null);
    });
  };
  return { user, users, getUser, setUser, addUser, updateUser, updateAvatar };
};
