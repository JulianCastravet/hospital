import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

export const useTitle = (title: string) => {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      document.title = `Hospital Dashboard - ${title}`;
    } else {
      document.title = title;
    }
  }, [title, isAuthenticated]);
};
