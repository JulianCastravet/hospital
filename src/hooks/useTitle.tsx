import { useEffect } from "react";
import { useUser } from "./useUser";

export const useTitle = (title: string) => {
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      document.title = `Hospital Dashboard - ${title}`;
    } else {
      document.title = `Hospital`;
    }
  }, [title,isAuthenticated]);
};
