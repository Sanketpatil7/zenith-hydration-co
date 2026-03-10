import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, phone: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updates: Partial<Pick<User, "name" | "phone">>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("puravida-user");
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem("puravida-user", JSON.stringify(user));
    else localStorage.removeItem("puravida-user");
  }, [user]);

  const signup = useCallback((name: string, email: string, phone: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("puravida-users") || "[]");
    if (users.find((u: any) => u.email === email)) {
      return { success: false, error: "An account with this email already exists." };
    }
    const newUser: User = { id: crypto.randomUUID(), name, email, phone, createdAt: new Date().toISOString() };
    users.push({ ...newUser, password });
    localStorage.setItem("puravida-users", JSON.stringify(users));
    setUser(newUser);
    return { success: true };
  }, []);

  const login = useCallback((email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("puravida-users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) return { success: false, error: "Invalid email or password." };
    const { password: _, ...userData } = found;
    setUser(userData);
    return { success: true };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateProfile = useCallback((updates: Partial<Pick<User, "name" | "phone">>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
