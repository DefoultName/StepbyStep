import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProfileDialog from "../components/auth/ProfileDialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Filter } from "lucide-react";

const Schedule = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const classes = [
    {
      id: "1",
      title: "Современные танцы",
      instructor: "Алиса Рейнольдс",
      time: "18:00 - 19:30",
      date: "Понедельник, 12 июня",
      spots: 8,
      level: "Средний",
      category: "contemporary",
    },
    {
      id: "2",
      title: "Основы Хип-Хопа",
      instructor: "Маркус Чен",
      time: "17:30 - 19:00",
      date: "Вторник, 13 июня",
      spots: 5,
      level: "Начинающий",
      category: "hiphop",
    },
    {
      id: "3",
      title: "Техника балета",
      instructor: "София Уильямс",
      time: "19:00 - 20:30",
      date: "Среда, 14 июня",
      spots: 12,
      level: "Все уровни",
      category: "ballet",
    },
    {
      id: "4",
      title: "Джаз-фьюжн",
      instructor: "Дерек Джонсон",
      time: "18:30 - 20:00",
      date: "Четверг, 15 июня",
      spots: 6,
      level: "Продвинутый",
      category: "jazz",
    },
    {
      id: "5",
      title: "Брейк-данс",
      instructor: "Алексей Петров",
      time: "19:30 - 21:00",
      date: "Пятница, 16 июня",
      spots: 4,
      level: "Средний",
      category: "breakdance",
    },
    {
      id: "6",
      title: "Балет для начинающих",
      instructor: "Елена Смирнова",
      time: "10:00 - 11:30",
      date: "Суббота, 17 июня",
      spots: 10,
      level: "Начинающий",
      category: "ballet",
    },
    {
      id: "7",
      title: "Хип-Хоп продвинутый",
      instructor: "Маркус Чен",
      time: "12:00 - 13:30",
      date: "Суббота, 17 июня",
      spots: 7,
      level: "Продвинутый",
      category: "hiphop",
    },
    {
      id: "8",
      title: "Современная хореография",
      instructor: "Алиса Рейнольдс",
      time: "14:00 - 15:30",
      date: "Воскресенье, 18 июня",
      spots: 9,
      level: "Все уровни",
      category: "contemporary",
    },
  ];

  const filteredClasses =
    activeFilter === "all"
      ? classes
      : classes.filter((c) => c.category === activeFilter);

  const filters = [
    { id: "all", name: "Все занятия" },
    { id: "ballet", name: "Балет" },
    { id: "contemporary", name: "Современные" },
    { id: "hiphop", name: "Хип-Хоп" },
    { id: "jazz", name: "Джаз" },
    { id: "breakdance", name: "Брейк-данс" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar transparent={false} />

      {/* Header */}
      <motion.div
        className="pt-32 pb-16 bg-gradient-to-b from-purple-900 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Расписание занятий
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Выберите удобное время для занятий и забронируйте место в группе.
            Наше расписание составлено так, чтобы каждый мог найти подходящее
            время.
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <section className="py-8 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Filter className="mr-2 text-purple-400" />
            <h2 className="text-xl font-semibold">Фильтры</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={
                  activeFilter === filter.id
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-purple-500 text-purple-400 hover:bg-purple-900 hover:text-white"
                }
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-purple-500 rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-purple-300 mb-2">
                    {classItem.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Инструктор: {classItem.instructor}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{classItem.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{classItem.time}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{classItem.spots} мест доступно</span>
                    </div>
                    <div className="mt-2">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded ${classItem.level === "Начинающий" ? "bg-green-900 text-green-300" : classItem.level === "Средний" ? "bg-yellow-900 text-yellow-300" : classItem.level === "Продвинутый" ? "bg-red-900 text-red-300" : "bg-blue-900 text-blue-300"}`}
                      >
                        {classItem.level}
                      </span>
                    </div>
                  </div>

                  <ProfileDialog
                    trigger={
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Забронировать
                      </Button>
                    }
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">
                Нет занятий, соответствующих выбранному фильтру
              </p>
              <Button
                className="mt-4 bg-purple-600 hover:bg-purple-700"
                onClick={() => setActiveFilter("all")}
              >
                Показать все занятия
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">
            Как забронировать занятие
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-black p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Выберите занятие</h3>
              <p className="text-gray-400">
                Просмотрите расписание и выберите подходящее занятие
              </p>
            </div>
            <div className="bg-black p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Войдите в аккаунт</h3>
              <p className="text-gray-400">
                Авторизуйтесь или зарегистрируйтесь, если у вас еще нет аккаунта
              </p>
            </div>
            <div className="bg-black p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Подтвердите бронь</h3>
              <p className="text-gray-400">
                Подтвердите бронирование и получите подтверждение на email
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Schedule;
