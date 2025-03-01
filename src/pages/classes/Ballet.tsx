import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ProfileDialog from "../../components/auth/ProfileDialog";
import { Button } from "@/components/ui/button";

const Ballet = () => {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Балет</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Освойте грацию и точность классической балетной техники под
            руководством опытных преподавателей.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-400">
                О занятиях балетом
              </h2>
              <p className="text-gray-300 mb-4">
                Балет — это классическое танцевальное искусство, которое
                развивает гибкость, силу, координацию и грацию. Наши занятия
                балетом подходят для учеников всех возрастов и уровней
                подготовки.
              </p>
              <p className="text-gray-300 mb-4">
                На занятиях вы освоите основные позиции, движения и технику
                классического балета. Наши преподаватели уделяют особое внимание
                правильной постановке корпуса, рук и ног, что является основой
                балетного искусства.
              </p>
              <p className="text-gray-300 mb-6">
                Регулярные занятия балетом помогут вам улучшить осанку, развить
                мышечный корсет, стать более гибким и выносливым, а также
                научиться контролировать свое тело.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-600 rounded-full p-1 mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Для начинающих
                    </h3>
                    <p className="text-gray-300">
                      Изучение основных позиций и простых движений, развитие
                      гибкости и координации
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-600 rounded-full p-1 mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Для среднего уровня
                    </h3>
                    <p className="text-gray-300">
                      Усложненные комбинации, работа над техникой и
                      выразительностью
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-600 rounded-full p-1 mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Для продвинутых
                    </h3>
                    <p className="text-gray-300">
                      Сложные вариации, работа над артистизмом и индивидуальным
                      стилем
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <ProfileDialog
                  trigger={
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Записаться на занятие
                    </Button>
                  }
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Балет"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-purple-400">
            Расписание занятий
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                level: "Начинающий",
                time: "Понедельник, 18:00 - 19:30",
                instructor: "Елена Петрова",
                spots: 8,
              },
              {
                level: "Средний",
                time: "Среда, 19:00 - 20:30",
                instructor: "София Родригес",
                spots: 5,
              },
              {
                level: "Продвинутый",
                time: "Пятница, 18:30 - 20:00",
                instructor: "Елена Петрова",
                spots: 3,
              },
              {
                level: "Начинающий",
                time: "Суббота, 10:00 - 11:30",
                instructor: "София Родригес",
                spots: 10,
              },
              {
                level: "Средний",
                time: "Суббота, 12:00 - 13:30",
                instructor: "Елена Петрова",
                spots: 6,
              },
              {
                level: "Все уровни",
                time: "Воскресенье, 11:00 - 12:30",
                instructor: "София Родригес",
                spots: 12,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black border border-purple-500 rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded ${item.level === "Начинающий" ? "bg-green-900 text-green-300" : item.level === "Средний" ? "bg-yellow-900 text-yellow-300" : item.level === "Продвинутый" ? "bg-red-900 text-red-300" : "bg-blue-900 text-blue-300"}`}
                    >
                      {item.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-purple-300 mb-2">
                    Балет
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Инструктор: {item.instructor}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-300">
                      <svg
                        className="h-4 w-4 mr-2 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <svg
                        className="h-4 w-4 mr-2 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                      </svg>
                      <span>{item.spots} мест доступно</span>
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

          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-900 hover:text-white"
              onClick={() => (window.location.href = "/schedule")}
            >
              Посмотреть полное расписание
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ballet;
