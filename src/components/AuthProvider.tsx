"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    // Check for auth cookie
    const match = document.cookie.match(/auth=([^;]+)/);
    if (match) {
      setUser(decodeURIComponent(match[1]));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = (username: string) => {
    setUser(username);
    document.cookie = `auth=${encodeURIComponent(username)}; path=/`;
  };

  const logout = () => {
    setUser(null);
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("sasa-birthday-popup");
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}; 