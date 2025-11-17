import { createContext, useContext, useState } from "react";
import { User } from "../types";

type AuthContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  setUserState: (u: User | undefined) => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | undefined>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : undefined;
  });

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, setUserState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
