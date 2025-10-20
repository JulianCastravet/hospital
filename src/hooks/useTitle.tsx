import { useEffect } from "react";
import { useAuth } from "../context/authContext";

export const useTitle = (title: string) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      document.title = `Hospital Dashboard - ${title}`;
    } else {
      document.title = `Hospital`;
    }
  }, [title,isAuthenticated]);
};
