import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Check, Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClassBookingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  className?: string;
  instructor?: string;
  time?: string;
  date?: string;
  level?: string;
  trigger?: React.ReactNode;
}

const ClassBookingForm = ({
  open,
  onOpenChange,
  onSuccess,
  className = "Все занятия",
  instructor = "Не указан",
  time = "Не указано",
  date = "Не указано",
  level = "Все уровни",
  trigger,
}: ClassBookingFormProps) => {
  const { user, isAuthenticated } = useAuth();
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookingMode, setBookingMode] = useState<"confirm" | "select">(
    "confirm",
  );

  // Имитация доступных классов
  const availableClasses = [
    {
      id: "ballet",
      name: "Балет",
      instructor: "Елена Петрова",
      level: "Средний",
    },
    {
      id: "contemporary",
      name: "Современные танцы",
      instructor: "Анна Соколова",
      level: "Начинающий",
    },
    {
      id: "hiphop",
      name: "Хип-Хоп",
      instructor: "Маркус Чен",
      level: "Продвинутый",
    },
    {
      id: "jazz",
      name: "Джаз",
      instructor: "София Родригес",
      level: "Средний",
    },
  ];

  // Имитация доступных временных слотов
  const availableTimes = [
    { id: "morning", time: "10:00 - 11:30", spots: 5 },
    { id: "afternoon", time: "14:00 - 15:30", spots: 3 },
    { id: "evening", time: "18:00 - 19:30", spots: 8 },
    { id: "late", time: "20:00 - 21:30", spots: 10 },
  ];

  const handleBooking = () => {
    if (!isAuthenticated || !user?.membership) {
      onOpenChange(false);
      return;
    }

    setIsBooking(true);

    // Имитация процесса бронирования
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);

      // Показываем сообщение об успешном бронировании на 2 секунды
      setTimeout(() => {
        setBookingSuccess(false);
        if (onSuccess) {
          onSuccess();
        }
        onOpenChange(false);
        // Сбрасываем форму
        setSelectedClass("");
        setSelectedTime("");
        setBookingMode("confirm");
      }, 2000);
    }, 1500);
  };

  // Проверяем, может ли пользователь забронировать занятие
  const canBook =
    isAuthenticated && user?.membership && user.membership.remainingClasses > 0;
  // Проверяем, соответствует ли стиль занятия абонементу пользователя
  const isStyleMatched =
    !user?.membership?.style ||
    user.membership.style === className ||
    user.membership.style === "Все стили";

  const isFormValid =
    bookingMode === "confirm" ||
    (selectedDate && selectedClass && selectedTime);

  const handleSwitchToSelectMode = () => {
    setBookingMode("select");
  };

  const renderConfirmContent = () => (
    <div className="mt-6 space-y-4">
      <div className="bg-gray-900 p-4 rounded-lg">
        <h3 className="text-xl font-semibold text-purple-300 mb-3">
          {className}
        </h3>

        <div className="space-y-2">
          <div className="flex items-center text-gray-300">
            <Users className="h-4 w-4 mr-2 text-purple-400" />
            <span>Инструктор: {instructor}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <CalendarIcon className="h-4 w-4 mr-2 text-purple-400" />
            <span>Дата: {date}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Clock className="h-4 w-4 mr-2 text-purple-400" />
            <span>Время: {time}</span>
          </div>
          <div className="mt-2">
            <span
              className={`inline-block px-2 py-1 text-xs rounded ${level === "Начинающий" ? "bg-green-900 text-green-300" : level === "Средний" ? "bg-yellow-900 text-yellow-300" : level === "Продвинутый" ? "bg-red-900 text-red-300" : "bg-blue-900 text-blue-300"}`}
            >
              {level}
            </span>
          </div>
        </div>
      </div>

      {isAuthenticated && user?.membership ? (
        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">
            Ваш абонемент
          </h3>
          <p className="text-gray-300">
            План: <span className="font-semibold">{user.membership.plan}</span>
          </p>
          {user.membership.style && (
            <p className="text-gray-300">
              Стиль:{" "}
              <span className="font-semibold">{user.membership.style}</span>
            </p>
          )}
          <p className="text-gray-300 mt-1">
            Осталось занятий:{" "}
            <span className="font-semibold">
              {user.membership.remainingClasses}
            </span>
          </p>

          {!isStyleMatched && (
            <div className="mt-2 text-red-400 text-sm">
              Ваш абонемент действует только для занятий "
              {user.membership.style}"
            </div>
          )}

          {user.membership.remainingClasses <= 0 && (
            <div className="mt-2 text-red-400 text-sm">
              У вас закончились занятия. Пожалуйста, продлите абонемент.
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-900 p-4 rounded-lg text-center">
          <p className="text-yellow-400 mb-2">
            Для бронирования необходимо войти в аккаунт и приобрести абонемент
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <motion.div
          whileHover={{ scale: canBook && isStyleMatched ? 1.03 : 1 }}
          whileTap={{ scale: canBook && isStyleMatched ? 0.98 : 1 }}
          className="flex-1"
        >
          <Button
            onClick={handleBooking}
            className={`w-full font-bold py-3 ${canBook && isStyleMatched ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-gray-700 text-gray-400 cursor-not-allowed"}`}
            disabled={
              !canBook || !isStyleMatched || isBooking || bookingSuccess
            }
          >
            {isBooking ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Бронирование...
              </>
            ) : bookingSuccess ? (
              "Забронировано!"
            ) : (
              "Забронировать занятие"
            )}
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1"
        >
          <Button
            variant="outline"
            className="w-full border-purple-500 text-purple-400 hover:bg-purple-900 hover:text-white"
            onClick={handleSwitchToSelectMode}
          >
            Выбрать другое занятие
          </Button>
        </motion.div>
      </div>

      {!isAuthenticated && (
        <p className="text-center text-gray-400 text-sm">
          Войдите в аккаунт, чтобы забронировать занятие
        </p>
      )}
    </div>
  );

  const renderSelectContent = () => (
    <div className="space-y-6 mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Выберите дату
        </label>
        <div className="bg-gray-900 border border-gray-700 rounded-md p-3">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="bg-gray-900 text-white"
            disabled={(date) => date < new Date()}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Выберите класс
        </label>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
            <SelectValue placeholder="Выберите класс" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700 text-white">
            {availableClasses.map((cls) => (
              <SelectItem key={cls.id} value={cls.id}>
                {cls.name} - {cls.instructor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Выберите время
        </label>
        <Select value={selectedTime} onValueChange={setSelectedTime}>
          <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
            <SelectValue placeholder="Выберите время" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700 text-white">
            {availableTimes.map((time) => (
              <SelectItem key={time.id} value={time.id}>
                {time.time} ({time.spots} мест)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4">
        <motion.div
          whileHover={{ scale: isFormValid ? 1.02 : 1 }}
          whileTap={{ scale: isFormValid ? 0.98 : 1 }}
        >
          <Button
            onClick={handleBooking}
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={!isFormValid || !canBook}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Забронировать
          </Button>
        </motion.div>
      </div>
    </div>
  );

  const dialogContent = (
    <DialogContent className="bg-black border border-purple-700 text-white max-w-md w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-purple-400">
            Бронирование занятия
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-center">
            {bookingSuccess ? (
              <div className="text-green-400 font-semibold">
                Занятие успешно забронировано!
              </div>
            ) : bookingMode === "confirm" ? (
              <div>Подтвердите бронирование занятия</div>
            ) : (
              <div>Выберите занятие для бронирования</div>
            )}
          </DialogDescription>
        </DialogHeader>

        {bookingSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10"
          >
            <div className="bg-green-900/30 rounded-full p-4 mb-4">
              <Check className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Бронирование успешно!
            </h3>
            <p className="text-gray-400 text-center">
              Ваше занятие забронировано. Информация появится в личном кабинете.
            </p>
          </motion.div>
        ) : bookingMode === "confirm" ? (
          renderConfirmContent()
        ) : (
          renderSelectContent()
        )}
      </motion.div>
    </DialogContent>
  );

  if (trigger) {
    return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        {dialogContent}
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {dialogContent}
    </Dialog>
  );
};

export default ClassBookingForm;
