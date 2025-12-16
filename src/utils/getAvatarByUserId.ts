import { useUserStore } from "../store/user.store";

export const getAvatarByUserId = (id: string | undefined):string | null => {

  const users = useUserStore.getState().users

  return users.find((user) => user._id === id)?.avatarUrl || null;
};
