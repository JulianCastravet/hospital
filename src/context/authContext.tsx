import { createContext, useContext, useState } from "react";

export type User = {
  _id: string;
  type: string;
  name: string;
  specialization?: string | null;
  dateOfBirth: string;
  phone: string;
  email: string;
  password: string;
  age?: number;
  avatarUrl?: string;
  formattedAddress?: string;
};

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
