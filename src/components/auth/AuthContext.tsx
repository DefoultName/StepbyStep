import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  membership?: {
    plan: string;
    expiresAt: Date;
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
  purchaseMembership: (plan: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверяем, есть ли сохраненный пользователь при загрузке
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Преобразуем строку даты обратно в объект Date
      if (parsedUser.membership && parsedUser.membership.expiresAt) {
        parsedUser.membership.expiresAt = new Date(
          parsedUser.membership.expiresAt,
        );
      }
      setUser(parsedUser);
      setIsAuthenticated(true);

      // Проверяем срок действия абонемента
      checkMembershipExpiration(parsedUser);
    }
  }, []);

  // Проверка срока действия абонемента и отправка уведомления
  const checkMembershipExpiration = (user: User) => {
    if (user.membership && user.membership.expiresAt) {
      const expiresAt = new Date(user.membership.expiresAt);
      const now = new Date();
      const daysLeft = Math.ceil(
        (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (daysLeft <= 3 && daysLeft > 0) {
        // Отправляем уведомление о скором окончании абонемента
        if (Notification.permission === "granted") {
          new Notification("Срок действия абонемента истекает", {
            body: `Ваш абонемент "${user.membership.plan}" истекает через ${daysLeft} ${getDaysWord(daysLeft)}. Не забудьте продлить!`,
            icon: "/favicon.ico",
          });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification("Срок действия абонемента истекает", {
                body: `Ваш абонемент "${user.membership.plan}" истекает через ${daysLeft} ${getDaysWord(daysLeft)}. Не забудьте продлить!`,
                icon: "/favicon.ico",
              });
            }
          });
        }
      }
    }
  };

  // Склонение слова "день"
  const getDaysWord = (days: number): string => {
    if (days % 10 === 1 && days % 100 !== 11) {
      return "день";
    } else if (
      [2, 3, 4].includes(days % 10) &&
      ![12, 13, 14].includes(days % 100)
    ) {
      return "дня";
    } else {
      return "дней";
    }
  };

  // Имитация входа в систему
  const login = async (email: string, password: string) => {
    // В реальном приложении здесь был бы запрос к API
    // Имитируем успешный вход
    const mockUser: User = {
      id: "1",
      name: "Пользователь",
      email: email,
      phone: "+7 (999) 123-4567",
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  // Имитация регистрации
  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string,
  ) => {
    // В реальном приложении здесь был бы запрос к API
    // Имитируем успешную регистрацию
    const mockUser: User = {
      id: "1",
      name: name,
      email: email,
      phone: phone,
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  // Выход из системы
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // Обновление данных пользователя
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  // Покупка абонемента
  const purchaseMembership = (plan: string) => {
    if (user) {
      // Устанавливаем срок действия абонемента на 30 дней
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      const updatedUser = {
        ...user,
        membership: {
          plan: plan,
          expiresAt: expiresAt,
        },
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Запрашиваем разрешение на отправку уведомлений
      if (
        Notification.permission !== "granted" &&
        Notification.permission !== "denied"
      ) {
        Notification.requestPermission();
      }

      // Отправляем уведомление о покупке абонемента
      if (Notification.permission === "granted") {
        new Notification("Абонемент активирован", {
          body: `Ваш абонемент "${plan}" успешно активирован и действует до ${expiresAt.toLocaleDateString()}`,
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
