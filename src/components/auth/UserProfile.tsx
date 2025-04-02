import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  CalendarClock,
  CreditCard,
  LogOut,
  User,
  Settings,
  Bell,
  CreditCardIcon,
  Key,
  Save,
  UserCircle,
  History,
  Calendar,
  ChevronRight,
  Plus,
  Wallet,
  Shield,
  Mail,
  Phone,
  Edit,
  Check,
} from "lucide-react";
import ClassBookingForm from "./ClassBookingForm";

interface UserProfileProps {
  onPurchaseMembership?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface BookedClass {
  id: string;
  date: Date;
  time: string;
  day: string;
  className: string;
  instructor: string;
}

const UserProfile = ({ onPurchaseMembership = () => {} }: UserProfileProps) => {
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [bookingCancelled, setBookingCancelled] = useState(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  // Имитация забронированных занятий
  const [bookedClasses, setBookedClasses] = useState<BookedClass[]>([
    {
      id: "booking-001",
      date: new Date(2023, 9, 25),
      time: "17:30 - 19:00",
      day: "Вторник",
      className: "Хип-Хоп",
      instructor: "Маркус Чен",
    },
    {
      id: "booking-002",
      date: new Date(2023, 9, 27),
      time: "18:00 - 19:30",
      day: "Четверг",
      className: "Балет",
      instructor: "Елена Петрова",
    },
  ]);

  // Функция для отмены бронирования
  const cancelBooking = (bookingId: string) => {
    setBookedClasses(
      bookedClasses.filter((booking) => booking.id !== bookingId),
    );
    setBookingCancelled(true);
  };

  // Показать уведомление об отмене бронирования
  useEffect(() => {
    if (bookingCancelled) {
      const timer = setTimeout(() => {
        setBookingCancelled(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [bookingCancelled]);

  // Форма редактирования
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!user) {
    return null;
  }

  // Получение информации об оставшихся занятиях
  const getRemainingClasses = () => {
    if (user.membership?.remainingClasses !== undefined) {
      return user.membership.remainingClasses;
    }
    return 0;
  };

  // Получение процента оставшихся занятий
  const getClassesPercentage = () => {
    if (
      user.membership?.remainingClasses !== undefined &&
      user.membership?.totalClasses
    ) {
      return (
        (user.membership.remainingClasses / user.membership.totalClasses) * 100
      );
    }
    return 0;
  };

  const remainingClasses = getRemainingClasses();
  const classesPercentage = getClassesPercentage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    // В реальном приложении здесь была бы валидация
    updateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });
    setEditMode(false);
  };

  const handleChangePassword = () => {
    // В реальном приложении здесь была бы проверка текущего пароля и валидация
    if (formData.newPassword === formData.confirmPassword) {
      // Обновление пароля
      alert("Пароль успешно изменен");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } else {
      alert("Пароли не совпадают");
    }
  };

  // Имитация истории платежей
  const paymentHistory = [
    {
      id: "pay-001",
      date: new Date(2023, 8, 15),
      amount: 9900,
      plan: "Премиум",
      status: "Оплачено",
    },
    {
      id: "pay-002",
      date: new Date(2023, 7, 15),
      amount: 5900,
      plan: "Базовый",
      status: "Оплачено",
    },
  ];

  // Имитация истории посещений
  const visitHistory = [
    {
      id: "visit-001",
      date: new Date(2023, 8, 20),
      className: "Хип-Хоп",
      instructor: "Маркус Чен",
    },
    {
      id: "visit-002",
      date: new Date(2023, 8, 18),
      className: "Балет",
      instructor: "Елена Петрова",
    },
    {
      id: "visit-003",
      date: new Date(2023, 8, 15),
      className: "Джаз",
      instructor: "София Родригес",
    },
  ];

  return (
    <div className="bg-gray-900 rounded-lg p-6 max-w-3xl mx-auto overflow-y-auto max-h-[80vh]">
      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-4">
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center mb-3 shadow-lg border-2 border-purple-400/30">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white text-center">
            {user.name}
          </h2>
          <p className="text-gray-400 text-center">{user.email}</p>
        </div>

        <div className="flex-grow">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-6 bg-gray-800 p-1">
              <TabsTrigger
                value="overview"
                className="flex items-center gap-2 data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                <UserCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Обзор</span>
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="flex items-center gap-2 data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Платежи</span>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex items-center gap-2 data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">История</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center gap-2 data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Настройки</span>
              </TabsTrigger>
            </TabsList>

            {/* Обзор */}
            <TabsContent value="overview" className="space-y-6">
              {/* Информация об абонементе */}
              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 shadow-md hover:border-purple-700/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Абонемент
                </h3>
                {user.membership ? (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-white mb-1">
                          План:{" "}
                          <span className="font-semibold text-purple-300">
                            {user.membership.plan}
                          </span>
                        </p>
                        {user.membership.style && (
                          <p className="text-white mb-1">
                            Стиль:{" "}
                            <span className="font-semibold text-purple-300">
                              {user.membership.style}
                            </span>
                          </p>
                        )}
                        <div className="flex items-center mb-2">
                          <CalendarClock className="mr-2 h-4 w-4 text-gray-400" />
                          <p className="text-gray-300">
                            Куплен:{" "}
                            {new Date(
                              user.membership.purchasedAt,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${remainingClasses <= 3 ? "bg-red-500" : "bg-green-500"}`}
                            style={{ width: `${classesPercentage}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-400 mt-2 text-center">
                          {remainingClasses > 0
                            ? `Осталось ${remainingClasses} ${getClassesWord(remainingClasses)} из ${user.membership.totalClasses}`
                            : "Занятия закончились"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          onClick={onPurchaseMembership}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          Продлить абонемент
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full border-purple-500 text-purple-400 hover:bg-purple-900 hover:text-white"
                          onClick={() => setActiveTab("history")}
                        >
                          История занятий
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700">
                      <p className="text-gray-300 mb-3 text-center">
                        У вас нет активного абонемента
                      </p>
                      <p className="text-sm text-gray-400 mb-4 text-center">
                        Приобретите абонемент, чтобы получить доступ к занятиям
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={onPurchaseMembership}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Приобрести абонемент
                      </Button>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Ближайшие занятия */}
              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 shadow-md hover:border-purple-700/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Ближайшие занятия
                </h3>
                {user.membership && user.membership.remainingClasses > 0 ? (
                  <div className="space-y-3">
                    {bookedClasses.length > 0 ? (
                      bookedClasses.map((booking) => (
                        <div
                          key={booking.id}
                          className="bg-gray-900 rounded-lg p-3 border border-gray-700 flex justify-between items-center"
                        >
                          <div>
                            <p className="text-white font-medium">
                              {booking.className}
                            </p>
                            <p className="text-sm text-gray-400">
                              {booking.day}, {booking.time}
                            </p>
                            <p className="text-sm text-gray-400">
                              Инструктор: {booking.instructor}
                            </p>
                            <p className="text-xs text-gray-500">
                              {booking.date.toLocaleDateString()}
                            </p>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-500 text-purple-400 hover:bg-purple-900 hover:text-white"
                              onClick={() => cancelBooking(booking.id)}
                            >
                              Отменить
                            </Button>
                          </motion.div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-700">
                        <p className="text-gray-300 mb-2">
                          У вас нет забронированных занятий
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                          Забронируйте занятия из расписания
                        </p>
                      </div>
                    )}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-3"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-purple-500 text-purple-400 hover:bg-purple-900 hover:text-white"
                        onClick={() => setIsBookingFormOpen(true)}
                      >
                        Забронировать занятие
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-700">
                    <p className="text-gray-300 mb-2">
                      У вас нет забронированных занятий
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                      {user.membership
                        ? "Ваш абонемент закончился. Продлите его, чтобы забронировать занятия."
                        : "Приобретите абонемент, чтобы забронировать занятия"}
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={onPurchaseMembership}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {user.membership
                          ? "Продлить абонемент"
                          : "Приобрести абонемент"}
                      </Button>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Уведомление об отмене бронирования */}
              {bookingCancelled && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed bottom-4 right-4 bg-green-900 text-green-100 p-4 rounded-lg shadow-lg z-50 max-w-md"
                >
                  <div className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-300" />
                    <p>Бронирование успешно отменено</p>
                  </div>
                </motion.div>
              )}
            </TabsContent>

            {/* Платежи */}
            <TabsContent value="payments" className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 shadow-md hover:border-purple-700/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                  <CreditCardIcon className="mr-2 h-5 w-5" />
                  Способы оплаты
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-purple-700 p-2 rounded-full mr-3">
                        <CreditCardIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Visa •••• 4242</p>
                        <p className="text-sm text-gray-400">Истекает 12/25</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded mr-2">
                        Основная
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-purple-500 text-purple-400 hover:bg-purple-900 hover:text-white mt-2"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Добавить способ оплаты
                    </Button>
                  </motion.div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 shadow-md hover:border-purple-700/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                  <History className="mr-2 h-5 w-5" />
                  История платежей
                </h3>
                {paymentHistory.length > 0 ? (
                  <div className="space-y-3">
                    {paymentHistory.map((payment) => (
                      <div
                        key={payment.id}
                        className="bg-gray-900 rounded-lg p-3 border border-gray-700 flex justify-between items-center"
                      >
                        <div>
                          <p className="text-white font-medium">
                            {payment.plan}
                          </p>
                          <p className="text-sm text-gray-400">
                            {payment.date.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">
                            {payment.amount} ₽
                          </p>
                          <p className="text-xs px-2 py-0.5 rounded bg-green-900 text-green-300 inline-block">
                            {payment.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-700">
                    <p className="text-gray-300">
                      У вас еще нет истории платежей
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* История */}
            <TabsContent value="history" className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 shadow-md hover:border-purple-700/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  История посещений
                </h3>
                {visitHistory.length > 0 ? (
                  <div className="space-y-3">
                    {visitHistory.map((visit) => (
                      <div
                        key={visit.id}
                        className="bg-gray-900 rounded-lg p-3 border border-gray-700"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-white font-medium">
                              {visit.className}
                            </p>
                            <p className="text-sm text-gray-400">
                              Инструктор: {visit.instructor}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-white">
                              {visit.date.toLocaleDateString()}
                            </p>
                            <p className="text-xs px-2 py-0.5 rounded bg-purple-900 text-purple-300 inline-block">
                              Посещено
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-700">
                    <p className="text-gray-300">
                      У вас еще нет истории посещений
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 shadow-md hover:border-purple-700/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  История абонементов
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">Премиум</p>
                        <p className="text-sm text-gray-400">16 занятий</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">15.09.2023 - 15.11.2023</p>
                        <p className="text-xs px-2 py-0.5 rounded bg-green-900 text-green-300 inline-block">
                          Активен
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">Базовый</p>
                        <p className="text-sm text-gray-400">8 занятий</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">15.07.2023 - 15.09.2023</p>
                        <p className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-300 inline-block">
                          Завершен
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Настройки */}
            <TabsContent value="settings" className="space-y-6">
              {/* Личные данные */}
              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 shadow-md hover:border-purple-700/50 transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-purple-400 flex items-center">
                    <UserCircle className="mr-2 h-5 w-5" />
                    Личные данные
                  </h3>
                  {!editMode && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditMode(true)}
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Изменить
                    </Button>
                  )}
                </div>

                {editMode ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-gray-300 mb-1 block"
                        >
                          Имя
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-gray-300 mb-1 block"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-gray-300 mb-1 block"
                      >
                        Телефон
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-gray-900 border-gray-700 text-white"
                      />
                    </div>
                    <div className="flex gap-3 mt-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          onClick={handleSaveProfile}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Сохранить
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          onClick={() => setEditMode(false)}
                          className="w-full border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                        >
                          Отмена
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Имя</p>
                        <p className="text-white flex items-center">
                          <UserCircle className="h-4 w-4 mr-2 text-purple-400" />
                          {user.name}
                        </p>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Email</p>
                        <p className="text-white flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-purple-400" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <p className="text-sm text-gray-400 mb-1">Телефон</p>
                      <p className="text-white flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-purple-400" />
                        {user.phone || "Не указан"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Изменение пароля */}
              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 shadow-md hover:border-purple-700/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                  <Key className="mr-2 h-5 w-5" />
                  Изменение пароля
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="currentPassword"
                      className="text-gray-300 mb-1 block"
                    >
                      Текущий пароль
                    </Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="newPassword"
                      className="text-gray-300 mb-1 block"
                    >
                      Новый пароль
                    </Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="confirmPassword"
                      className="text-gray-300 mb-1 block"
                    >
                      Подтверждение пароля
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="bg-gray-900 border-gray-700 text-white"
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleChangePassword}
                      className="w-full bg-purple-600 hover:bg-purple-700 mt-2"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Изменить пароль
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Настройки уведомлений */}
              <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 shadow-md hover:border-purple-700/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Настройки уведомлений
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications" className="text-white">
                        Уведомления
                      </Label>
                      <p className="text-sm text-gray-400">
                        Включить все уведомления
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="emailNotifications"
                        className="text-white"
                      >
                        Email уведомления
                      </Label>
                      <p className="text-sm text-gray-400">
                        Получать уведомления на email
                      </p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={emailNotifications && notifications}
                      onCheckedChange={setEmailNotifications}
                      disabled={!notifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="smsNotifications" className="text-white">
                        SMS уведомления
                      </Label>
                      <p className="text-sm text-gray-400">
                        Получать уведомления по SMS
                      </p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={smsNotifications && notifications}
                      onCheckedChange={setSmsNotifications}
                      disabled={!notifications}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Кнопка выхода */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={logout}
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:bg-red-900 hover:text-white mt-4"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Выйти из аккаунта
        </Button>
      </motion.div>

      {/* Форма бронирования занятия */}
      <ClassBookingForm
        open={isBookingFormOpen}
        onOpenChange={setIsBookingFormOpen}
        onSuccess={() => {
          // Имитация добавления нового бронирования
          const newBooking = {
            id: `booking-${Date.now()}`,
            date: new Date(2023, 9, 30),
            time: "19:00 - 20:30",
            day: "Суббота",
            className: "Джаз",
            instructor: "София Родригес",
          };
          setBookedClasses([...bookedClasses, newBooking]);
        }}
      />
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

// Функция для правильного склонения слова "занятие"
function getClassesWord(classes: number): string {
  if (classes % 10 === 1 && classes % 100 !== 11) {
    return "занятие";
  } else if (
    [2, 3, 4].includes(classes % 10) &&
    ![12, 13, 14].includes(classes % 100)
  ) {
    return "занятия";
  } else {
    return "занятий";
  }
}

export default UserProfile;
