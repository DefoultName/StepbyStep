import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ProfileDialog from "../../components/auth/ProfileDialog";
import { Button } from "@/components/ui/button";

const Contemporary = () => {
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
            Современные танцы
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Выразите себя через плавные движения и современные техники под
            руководством профессиональных хореографов.
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
                О современных танцах
              </h2>
              <p className="text-gray-300 mb-4">
                Современный танец — это свобода самовыражения через движение.
                Это синтез различных танцевальных техник, который позволяет
                танцору выразить свои эмоции и чувства через пластику тела.
              </p>
              <p className="text-gray-300 mb-4">
                На наших занятиях вы познакомитесь с различными направлениями
                современного танца: контемпорари, модерн, импровизация. Вы
                научитесь чувствовать свое тело, работать с пространством и
                музыкой, выражать эмоции через движение.
              </p>
              <p className="text-gray-300 mb-6">
                Современный танец развивает не только физические качества, но и
                творческое мышление, эмоциональный интеллект и способность к
                самовыражению.
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
                      Базовые принципы движения, работа с весом и пространством,
                      простые комбинации
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
                      Сложные комбинации, работа с партнером, импровизация,
                      развитие индивидуального стиля
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
                      Создание собственных хореографических композиций, работа
                      над выразительностью и эмоциональностью
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
                src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Современные танцы"
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
                time: "Понедельник, 19:30 - 21:00",
                instructor: "Алиса Рейнольдс",
                spots: 7,
              },
              {
                level: "Средний",
                time: "Вторник, 18:00 - 19:30",
                instructor: "Давид Чен",
                spots: 4,
              },
              {
                level: "Продвинутый",
                time: "Четверг, 19:00 - 20:30",
                instructor: "Алиса Рейнольдс",
                spots: 3,
              },
              {
                level: "Начинающий",
                time: "Пятница, 18:00 - 19:30",
                instructor: "Давид Чен",
                spots: 9,
              },
              {
                level: "Средний",
                time: "Суббота, 14:00 - 15:30",
                instructor: "Алиса Рейнольдс",
                spots: 5,
              },
              {
                level: "Все уровни",
                time: "Воскресенье, 12:00 - 13:30",
                instructor: "Давид Чен",
                spots: 10,
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
                    Современные танцы
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

export default Contemporary;
