"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("recruiter"); // Default to recruiter
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data based on role
  const mockUsers = {
    recruiter: {
      id: "rec_1",
      name: "Sarah Chen",
      email: "sarah.chen@techcorp.com",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=0ea5e9&color=fff",
      company: "TechCorp Inc.",
      role: "recruiter",
    },
    seeker: {
      id: "seek_1",
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=16a34a&color=fff",
      role: "seeker",
      title: "Full Stack Developer",
    },
  };

  // Auto-login with mock user based on role
  useEffect(() => {
    setUser(mockUsers[role]);
  }, [role]);

  const switchRole = (newRole) => {
    setRole(newRole);
  };

  const login = async (credentials) => {
    setIsLoading(true);
    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser(mockUsers[role]);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    role,
    isLoading,
    login,
    logout,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}