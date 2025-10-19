import { createContext, useContext, useState } from "react";

export type User = {
  type: string;
  name: string;
  specialization?: string | null;
  dateOfBirth: string;
  phone: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | undefined;
  setUser: (u: User | undefined) => void;
  isAuthenticated: boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | undefined>(() => {
    // read from localStorage on first load
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : undefined;
  });

  const isAuthenticated = !!user;

  const setUser = (u: User | undefined) => {
    setUserState(u);
    if (u) {
      localStorage.setItem("user", JSON.stringify(u));
      localStorage.setItem("isAuthenticated", "true");
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
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
