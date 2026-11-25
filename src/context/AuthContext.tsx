import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/User";

type AuthContextType = {
  currentUser: User | null;
  signup: (user: User) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signup: () => false,
  login: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Register a new user
  const signup = (user: User) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const existingUser = users.find((item) => item.email === user.email);

    if (existingUser) return false;

    const newUser: User = {
      ...user,
      role: "user",
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setCurrentUser(newUser);

    return true;
  };

  // Login an existing user
  const login = (email: string, password: string) => {
    // Check admin credentials first

    if (email === "admin@eventify.com" && password === "admin123") {
      const admin: User = {
        name: "Eventify Admin",
        email: "admin@eventify.com",
        password: "admin123",
        role: "admin",
      };

      localStorage.setItem("currentUser", JSON.stringify(admin));
      setCurrentUser(admin);

      return true;
    }

    // Check normal users

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (item) => item.email === email && item.password === password,
    );

    if (!user) return false;

    const loggedInUser: User = {
      ...user,
      role: "user",
    };

    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
    setCurrentUser(loggedInUser);

    return true;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
