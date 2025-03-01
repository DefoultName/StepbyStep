import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ClassCardProps {
  title: string;
  description: string;
  instructor: string;
  image: string;
  level: string;
}

const ClassCard = ({
  title = "Современные танцы",
  description = "Выразите себя через плавные движения и современные техники",
  instructor = "Сара Джонсон",
  image = "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=350&q=80",
  level = "Средний",
}: ClassCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full overflow-hidden bg-black border-purple-800 border-2">
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute top-0 left-0 px-3 py-1 m-2 text-xs font-semibold text-black bg-yellow-400 rounded-full">
            {level}
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-white">{title}</CardTitle>
          <CardDescription className="text-sm text-gray-400">
            Instructor: {instructor}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-gray-300">
          <p>{description}</p>
        </CardContent>
        <CardFooter className="pt-2">
          <motion.button
            className="flex items-center text-sm text-purple-400 group"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
            onClick={() => (window.location.href = "/classes")}
          >
            Подробнее
            <motion.span
              className="ml-2"
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </motion.button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const ClassesPreview = () => {
  const classes = [
    {
      title: "Современные танцы",
      description: "Выразите себя через плавные движения и современные техники",
      instructor: "Сара Джонсон",
      image:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=350&q=80",
      level: "Средний",
    },
    {
      title: "Хип-Хоп",
      description: "Изучите городские стили танца с энергичной хореографией",
      instructor: "Маркус Чен",
      image:
        "https://images.unsplash.com/photo-1535525153412-5a42439a210d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=350&q=80",
      level: "Все уровни",
    },
    {
      title: "Балет",
      description: "Освойте грацию и точность классической балетной техники",
      instructor: "Елена Петрова",
      image:
        "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=350&q=80",
      level: "Начинающий",
    },
    {
      title: "Джаз-фьюжн",
      description: "Сочетание традиционного джаза с современными стилями",
      instructor: "Тайрон Джексон",
      image:
        "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=350&q=80",
      level: "Продвинутый",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-purple-950">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white">Наши занятия</h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Откройте для себя страсть к танцу с нашим разнообразным выбором
            занятий под руководством инструкторов мирового класса. От начинающих
            до продвинутых танцоров, у нас есть что-то для каждого.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {classes.map((classItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ClassCard {...classItem} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-3 text-black transition-colors bg-yellow-400 rounded-full hover:bg-yellow-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/classes")}
          >
            Все занятия
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClassesPreview;
