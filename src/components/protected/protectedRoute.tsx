import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuthStore } from "../../store/auth.store";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
 
  return <>{children}</>;
};
