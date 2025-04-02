import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  membership?: {
    plan: string;
    style?: string;
    remainingClasses: number;
    totalClasses: number;
    purchasedAt: Date;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phone?: string,
  ) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  purchaseMembership: (plan: string, style?: string, classes?: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Using named function declaration for consistent Fast Refresh
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if there's a saved user on load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Convert date string back to Date object
      if (parsedUser.membership && parsedUser.membership.purchasedAt) {
        parsedUser.membership.purchasedAt = new Date(
          parsedUser.membership.purchasedAt,
        );
      }
      setUser(parsedUser);
      setIsAuthenticated(true);

      // Check membership expiration
      checkMembershipExpiration(parsedUser);
    }
  }, []);

  // Check remaining classes in membership and send notification
  const checkMembershipExpiration = (user: User) => {
    if (user.membership && user.membership.remainingClasses !== undefined) {
      const remainingClasses = user.membership.remainingClasses;

      if (remainingClasses <= 3 && remainingClasses > 0) {
        // Send notification about membership expiration
        if (Notification.permission === "granted") {
          new Notification("Membership Expiring", {
            body: `Your membership \"${user.membership.plan}\" (${user.membership.style || "All styles"}): ${remainingClasses} ${getClassesWord(remainingClasses)} remaining. Don't forget to renew!`,
            icon: "/favicon.ico",
          });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification("Membership Expiring", {
                body: `Your membership \"${user.membership.plan}\" (${user.membership.style || "All styles"}): ${remainingClasses} ${getClassesWord(remainingClasses)} remaining. Don't forget to renew!`,
                icon: "/favicon.ico",
              });
            }
          });
        }
      }
    }
  };

  // Word declension for "day"
  const getDaysWord = (days: number): string => {
    if (days === 1) {
      return "day";
    } else {
      return "days";
    }
  };

  // Word declension for "class"
  const getClassesWord = (classes: number): string => {
    if (classes === 1) {
      return "class";
    } else {
      return "classes";
    }
  };

  // Login simulation
  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API request
      // Check if user exists in our "database"
      const registeredUsers = localStorage.getItem("registeredUsers");
      let users = [];

      if (registeredUsers) {
        users = JSON.parse(registeredUsers);
      } else {
        throw new Error("No registered users found. Please register first.");
      }

      const foundUser = users.find((u: any) => u.email === email);

      if (!foundUser) {
        throw new Error("User with this email not found. Please register.");
      }

      // In a real app, this would check the password securely
      // For demonstration, check that password matches the stored one
      if (
        !password ||
        (foundUser.password && foundUser.password !== password)
      ) {
        throw new Error("Invalid password");
      }

      const mockUser: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        membership: foundUser.membership,
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Registration simulation
  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string,
  ) => {
    try {
      // In a real app, this would be an API request
      // Check if user with this email already exists
      const registeredUsers = localStorage.getItem("registeredUsers");
      let users = [];

      if (registeredUsers) {
        users = JSON.parse(registeredUsers);
        const existingUser = users.find((u: any) => u.email === email);

        if (existingUser) {
          throw new Error("User with this email already exists");
        }
      }

      // Create new user with unique ID
      const newUserId = `user-${Date.now()}`;
      const mockUser: User = {
        id: newUserId,
        name: name,
        email: email,
        phone: phone,
      };

      // Save user to our "database"
      users.push({ ...mockUser, password: password });
      localStorage.setItem("registeredUsers", JSON.stringify(users));

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  // Purchase membership
  const purchaseMembership = (
    plan: string,
    style?: string,
    classes: number = 8,
  ) => {
    if (user) {
      const purchasedAt = new Date();

      const updatedUser = {
        ...user,
        membership: {
          plan: plan,
          style: style,
          remainingClasses: classes,
          totalClasses: classes,
          purchasedAt: purchasedAt,
        },
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Request permission for notifications
      if (
        Notification.permission !== "granted" &&
        Notification.permission !== "denied"
      ) {
        Notification.requestPermission();
      }

      // Send notification about membership purchase
      if (Notification.permission === "granted") {
        new Notification("Membership Activated", {
          body: `Your membership \"${plan}\" ${style ? `(${style})` : ""} has been successfully activated. ${classes} ${getClassesWord(classes)} available.`,
          icon: "/favicon.ico",
        });
      }
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    purchaseMembership,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
