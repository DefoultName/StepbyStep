import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";
import ProfileDialog from "../auth/ProfileDialog";
import ClassBookingForm from "../auth/ClassBookingForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ClassEvent {
  id: string;
  title: string;
  instructor: string;
  time: string;
  date: string;
  day: string;
  spots: number;
  level: string;
}

interface SchedulePreviewProps {
  featuredClasses?: ClassEvent[];
  title?: string;
  description?: string;
}

const SchedulePreview = ({
  featuredClasses = [
    {
      id: "1",
      title: "Современные танцы",
      instructor: "Алиса Рейнольдс",
      time: "18:00 - 19:30",
      date: "Понедельник, 12 июня",
      day: "Понедельник",
      spots: 8,
      level: "Средний",
    },
    {
      id: "2",
      title: "Основы Хип-Хопа",
      instructor: "Маркус Чен",
      time: "17:30 - 19:00",
      date: "Вторник, 13 июня",
      day: "Вторник",
      spots: 5,
      level: "Начинающий",
    },
    {
      id: "3",
      title: "Техника балета",
      instructor: "София Уильямс",
      time: "19:00 - 20:30",
      date: "Среда, 14 июня",
      day: "Среда",
      spots: 12,
      level: "Все уровни",
    },
    {
      id: "4",
      title: "Джаз-фьюжн",
      instructor: "Дерек Джонсон",
      time: "18:30 - 20:00",
      date: "Четверг, 15 июня",
      day: "Четверг",
      spots: 6,
      level: "Продвинутый",
    },
  ],
  title = "Ближайшие занятия",
  description = "Присоединяйтесь к нашим динамичным занятиям под руководством профессиональных инструкторов. Забронируйте место сегодня!",
}: SchedulePreviewProps) => {
  return (
    <section className="w-full py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-purple-400">{title}</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-300">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredClasses.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gray-900 border-purple-500 border overflow-hidden hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-purple-300">
                    {classItem.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    with {classItem.instructor}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="text-sm">{classItem.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="text-sm">{classItem.time}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="text-sm">
                        {classItem.spots} мест доступно
                      </span>
                    </div>
                    <div className="mt-2">
                      <span
                        className={cn(
                          "inline-block px-2 py-1 text-xs rounded",
                          classItem.level === "Beginner"
                            ? "bg-green-900 text-green-300"
                            : classItem.level === "Intermediate"
                              ? "bg-yellow-900 text-yellow-300"
                              : classItem.level === "Advanced"
                                ? "bg-red-900 text-red-300"
                                : "bg-blue-900 text-blue-300",
                        )}
                      >
                        {classItem.level}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <ClassBookingForm
                    open={false}
                    onOpenChange={() => {}}
                    className={classItem.title}
                    instructor={classItem.instructor}
                    time={classItem.time}
                    date={classItem.date}
                    level={classItem.level}
                    trigger={
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        size="sm"
                      >
                        Забронировать
                      </Button>
                    }
                  />
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/schedule">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-900 hover:text-white"
              size="lg"
            >
              Полное расписание
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SchedulePreview;
