import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { CalendarClock, CreditCard, LogOut, User } from "lucide-react";

interface UserProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchaseMembership: () => void;
}

const UserProfile = ({
  open,
  onOpenChange,
  onPurchaseMembership,
}: UserProfileProps) => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  // Форматирование даты окончания абонемента
  const formatExpiryDate = () => {
    if (user.membership?.expiresAt) {
      return new Date(user.membership.expiresAt).toLocaleDateString();
    }
    return "Нет активного абонемента";
  };

  // Расчет оставшихся дней абонемента
  const getRemainingDays = () => {
    if (user.membership?.expiresAt) {
      const expiryDate = new Date(user.membership.expiresAt);
      const today = new Date();
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  const remainingDays = getRemainingDays();

  return (
    <div className="bg-gray-900 rounded-lg p-6 max-w-md mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Информация об абонементе */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-400 mb-2 flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Абонемент
          </h3>
          {user.membership ? (
            <div>
              <p className="text-white mb-1">
                План:{" "}
                <span className="font-semibold">{user.membership.plan}</span>
              </p>
              <div className="flex items-center mb-2">
                <CalendarClock className="mr-2 h-4 w-4 text-gray-400" />
                <p className="text-gray-300">
                  Действует до: {formatExpiryDate()}
                </p>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${remainingDays <= 3 ? "bg-red-500" : "bg-green-500"}`}
                    style={{
                      width: `${Math.min((remainingDays / 30) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {remainingDays > 0
                    ? `Осталось ${remainingDays} ${getDaysWord(remainingDays)}`
                    : "Абонемент истек"}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-300 mb-3">
                У вас нет активного абонемента
              </p>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={onPurchaseMembership}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Приобрести абонемент
                </Button>
              </motion.div>
            </div>
          )}
        </div>

        {/* Личная информация */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">
            Личная информация
          </h3>
          <div className="space-y-2">
            <p className="text-gray-300">
              Телефон: {user.phone || "Не указан"}
            </p>
          </div>
        </div>

        {/* Кнопка выхода */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={logout}
            variant="outline"
            className="w-full border-red-500 text-red-500 hover:bg-red-900 hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Выйти из аккаунта
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

// Функция для правильного склонения слова "день"
function getDaysWord(days: number): string {
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
}

export default UserProfile;
