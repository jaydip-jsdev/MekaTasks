"use client";

import isAuthenticated from "@/lib/CheckAuth/auth";
import AuthContextType from "@/Types/authContextType";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      const auth = await isAuthenticated();
      setAuthenticated(auth);
    } catch (error) {
      console.log(error);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticated, loading, checkAuth, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
