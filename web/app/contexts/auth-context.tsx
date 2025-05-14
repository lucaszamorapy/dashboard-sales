"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

export interface IAuth {
  user_id: string | null;
  name: string | null;
  token: string | null;
}

interface AuthContextType {
  auth: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
}

interface IChildren {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: IChildren) => {
  const [auth, setAuth] = useState<IAuth>({
    user_id: null,
    name: null,
    token: null,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("name");
    const storedUserId = localStorage.getItem("user_id");
    if (storedToken && storedUsername && storedUserId) {
      setAuth({
        user_id: storedUserId,
        name: storedUsername,
        token: storedUsername,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
