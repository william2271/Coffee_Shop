import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define types for context
export interface AuthContextType {
  username: string;
  setUsername: (username: string) => void;
  role: "USER" | "ADMIN" | "unauthenticated";
  setRole: (role: "USER" | "ADMIN" | "unauthenticated") => void;
}
interface User{
    userId: number,
    username: string,
    password: string,
    role: "USER" | "ADMIN",
  }
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>('');
  const [role, setRole] = useState<"unauthenticated" | "USER" | "ADMIN">('unauthenticated');

  useEffect(() => {
    axios.get<User>('http://localhost:8081/users', { withCredentials: true })
      .then((res) => {
        setUsername(res.data.username);
        setRole(res.data.role);
      })
      .catch((err) => {
        console.log(err);
        setUsername('');
        setRole('unauthenticated');
      });
  }, []);

  return (
    <AuthContext.Provider value={{ username, setUsername, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};