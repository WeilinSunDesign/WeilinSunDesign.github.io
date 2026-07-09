import { createContext, useContext, useState, ReactNode } from "react";

const SESSION_KEY = "portfolio_unlocked";
const PASSWORD = "10141998"; // 改成你自己的密码

interface AuthContextType {
  isAuthenticated: boolean;
  unlock: (password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );

  const unlock = (password: string): boolean => {
    if (password === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, unlock }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
