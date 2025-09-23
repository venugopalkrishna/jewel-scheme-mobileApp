import { createContext, useContext, useState } from "react";

type AuthContextType = {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
  setIsLoggedIn: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLoggedIn] = useState(false);
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  return (
    <AuthContext.Provider value={{ isLogged, login, logout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within the AuthProvider");
  return context;
};
