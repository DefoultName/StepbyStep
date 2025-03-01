import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import ProfileDialog from "../auth/ProfileDialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  color?: string;
}

interface MembershipSectionProps {
  title?: string;
  description?: string;
  plans?: MembershipPlan[];
  onSelectPlan?: (planId: string) => void;
}

const defaultPlans: MembershipPlan[] = [
  {
    id: "basic",
    name: "Базовый",
    price: 5900,
    duration: "месяц",
    features: [
      "Доступ к 2 занятиям в неделю",
      "Онлайн-система бронирования",
      "Базовые материалы по танцам",
      "Без регистрационного сбора",
    ],
    color: "bg-purple-600",
  },
  {
    id: "premium",
    name: "Премиум",
    price: 9900,
    duration: "месяц",
    features: [
      "Безлимитные занятия",
      "Приоритетное бронирование",
      "Доступ к мастер-классам",
      "Отслеживание личного прогресса",
      "Эксклюзивные мероприятия для участников",
      "Скидки на товары",
    ],
    popular: true,
    color: "bg-amber-500",
  },
  {
    id: "family",
    name: "Семейный",
    price: 14900,
    duration: "месяц",
    features: [
      "Доступ для 4 членов семьи",
      "Безлимитные занятия",
      "Приоритетное бронирование",
      "Доступ к мастер-классам",
      "Семейные танцевальные мероприятия",
      "Частные семейные занятия (2 раза в месяц)",
    ],
    color: "bg-purple-800",
  },
];

const MembershipSection: React.FC<MembershipSectionProps> = ({
  title = "Планы абонементов",
  description = "Выберите идеальный абонемент для вашего танцевального пути. Присоединяйтесь к нашему сообществу и раскройте свой потенциал.",
  plans = defaultPlans,
  onSelectPlan = () => {},
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("membership-section");
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="membership-section"
      className="py-20 px-4 md:px-8 lg:px-16 bg-black text-white min-h-[700px] flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan) => (
            <motion.div key={plan.id} variants={itemVariants}>
              <Card
                className={`h-full flex flex-col bg-gray-900 border-gray-800 overflow-hidden ${plan.popular ? "ring-2 ring-amber-500" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-black font-semibold py-1 px-4 text-sm transform translate-x-[30%] translate-y-[30%] rotate-45">
                    Популярный
                  </div>
                )}
                <div
                  className={`h-2 w-full ${plan.color || "bg-purple-600"}`}
                />
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Идеально для{" "}
                    {plan.name === "Базовый"
                      ? "начинающих"
                      : plan.name === "Премиум"
                        ? "увлеченных танцоров"
                        : "всей семьи"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}₽</span>
                    <span className="text-gray-400">/{plan.duration}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <ProfileDialog
                    trigger={
                      <Button
                        className={`w-full ${plan.popular ? "bg-amber-500 hover:bg-amber-600 text-black" : "bg-purple-700 hover:bg-purple-800"}`}
                        size="lg"
                      >
                        Выбрать план
                      </Button>
                    }
                  />
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipSection;
