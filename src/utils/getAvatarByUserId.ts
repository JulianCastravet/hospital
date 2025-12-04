import { useUserStore } from "../store/user.store";

export const getAvatarByUserId = (id: string) => {

  const users = useUserStore.getState().users

  return users.find((user) => user._id === id)?.avatarUrl;
};
