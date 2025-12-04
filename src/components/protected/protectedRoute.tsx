import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuthStore } from "../../store/auth.store";
import { useWebSocketStore } from "../../websocket/websocket";
import env from "../../environment";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  const { connect } = useWebSocketStore();
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  connect(env.WEB_SOCKET_URL);
  return <>{children}</>;
};
