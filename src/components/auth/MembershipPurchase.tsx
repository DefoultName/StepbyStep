import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PaymentForm from "./PaymentForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  classes: number;
  features: string[];
  popular?: boolean;
  color?: string;
}

interface MembershipPurchaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const MembershipPurchase = ({
  open = true,
  onOpenChange = () => {},
  onSuccess,
}: MembershipPurchaseProps) => {
  const { purchaseMembership } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string>("Все стили");

  // Планы для разных стилей танцев
  const getPlansForStyle = (style: string): MembershipPlan[] => {
    switch (style) {
      case "Балет":
        return [
          {
            id: "ballet-basic",
            name: "Балет Базовый",
            price: 6500,
            classes: 8,
            features: [
              "8 занятий балета",
              "Онлайн-система бронирования",
              "Базовые материалы по балету",
              "Специальная балетная обувь в подарок",
            ],
            color: "bg-pink-600",
          },
          {
            id: "ballet-premium",
            name: "Балет Премиум",
            price: 10900,
            classes: 16,
            features: [
              "16 занятий балета",
              "Приоритетное бронирование",
              "Доступ к мастер-классам по балету",
              "Индивидуальная консультация с хореографом",
              "Участие в балетных постановках",
            ],
            popular: true,
            color: "bg-pink-500",
          },
        ];
      case "Современные танцы":
        return [
          {
            id: "contemporary-basic",
            name: "Современные Базовый",
            price: 6200,
            classes: 8,
            features: [
              "8 занятий современных танцев",
              "Онлайн-система бронирования",
              "Видеоуроки для практики дома",
              "Доступ к музыкальной библиотеке",
            ],
            color: "bg-blue-600",
          },
          {
            id: "contemporary-premium",
            name: "Современные Премиум",
            price: 10500,
            classes: 16,
            features: [
              "16 занятий современных танцев",
              "Приоритетное бронирование",
              "Участие в современных постановках",
              "Мастер-классы от приглашенных хореографов",
              "Персональный план развития",
            ],
            popular: true,
            color: "bg-blue-500",
          },
        ];
      case "Хип-Хоп":
        return [
          {
            id: "hiphop-basic",
            name: "Хип-Хоп Базовый",
            price: 5800,
            classes: 8,
            features: [
              "8 занятий хип-хопа",
              "Онлайн-система бронирования",
              "Базовые элементы и техники",
              "Участие в джемах студии",
            ],
            color: "bg-yellow-600",
          },
          {
            id: "hiphop-premium",
            name: "Хип-Хоп Премиум",
            price: 9800,
            classes: 16,
            features: [
              "16 занятий хип-хопа",
              "Приоритетное бронирование",
              "Участие в баттлах и соревнованиях",
              "Индивидуальные тренировки",
              "Мастер-классы от известных танцоров",
            ],
            popular: true,
            color: "bg-yellow-500",
          },
        ];
      case "Джаз":
        return [
          {
            id: "jazz-basic",
            name: "Джаз Базовый",
            price: 6300,
            classes: 8,
            features: [
              "8 занятий джаза",
              "Онлайн-система бронирования",
              "Основы джазовой хореографии",
              "Доступ к видеоурокам",
            ],
            color: "bg-purple-600",
          },
          {
            id: "jazz-premium",
            name: "Джаз Премиум",
            price: 10700,
            classes: 16,
            features: [
              "16 занятий джаза",
              "Приоритетное бронирование",
              "Участие в джазовых постановках",
              "Индивидуальные консультации",
              "Специальные мероприятия для участников",
            ],
            popular: true,
            color: "bg-purple-500",
          },
        ];
      default: // Все стили
        return [
          {
            id: "basic",
            name: "Базовый",
            price: 5900,
            classes: 8,
            features: [
              "8 занятий",
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
            classes: 16,
            features: [
              "16 занятий",
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
            classes: 32,
            features: [
              "32 занятия",
              "Доступ для 4 членов семьи",
              "Приоритетное бронирование",
              "Доступ к мастер-классам",
              "Семейные танцевальные мероприятия",
              "Частные семейные занятия (2 раза)",
            ],
            color: "bg-purple-800",
          },
        ];
    }
  };

  // Получаем планы в зависимости от выбранного стиля
  const plans = getPlansForStyle(selectedStyle);

  const handlePurchase = (planId: string) => {
    const plan = plans.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
      setIsPaymentOpen(true);
    }
  };

  const handlePaymentSuccess = (planName: string) => {
    if (selectedPlan) {
      purchaseMembership(
        planName,
        selectedStyle !== "Все стили" ? selectedStyle : undefined,
        selectedPlan.classes,
      );
      if (onSuccess) {
        onSuccess();
      }
      setIsPaymentOpen(false);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-black border border-purple-700 text-white max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-purple-400">
                Выберите абонемент
              </DialogTitle>
              <DialogDescription className="text-gray-300 text-center">
                Выберите подходящий план для вашего танцевального пути
              </DialogDescription>
            </DialogHeader>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Выберите стиль танца
              </label>
              <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Выберите стиль" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="Все стили">Все стили</SelectItem>
                  <SelectItem value="Балет">Балет</SelectItem>
                  <SelectItem value="Современные танцы">
                    Современные танцы
                  </SelectItem>
                  <SelectItem value="Хип-Хоп">Хип-Хоп</SelectItem>
                  <SelectItem value="Джаз">Джаз</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-400 mt-1">
                Выбор стиля ограничит использование абонемента только выбранным
                направлением
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden h-full flex flex-col relative">
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-amber-500 text-black font-semibold py-1 px-4 text-sm transform translate-x-[30%] translate-y-[30%] rotate-45">
                        Популярный
                      </div>
                    )}
                    <div
                      className={`h-2 w-full ${plan.color || "bg-purple-600"}`}
                    />

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        Идеально для{" "}
                        {plan.name === "Базовый"
                          ? "начинающих"
                          : plan.name === "Премиум"
                            ? "увлеченных танцоров"
                            : "всей семьи"}
                      </p>

                      <div className="mb-6">
                        <span className="text-3xl font-bold">
                          {plan.price}₽
                        </span>
                        <span className="text-gray-400">
                          /{plan.classes} занятий
                        </span>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-auto"
                      >
                        <Button
                          onClick={() => handlePurchase(plan.id)}
                          className={`w-full ${plan.popular ? "bg-amber-500 hover:bg-amber-600 text-black" : "bg-purple-700 hover:bg-purple-800"}`}
                          size="lg"
                        >
                          Выбрать
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {selectedPlan && (
        <PaymentForm
          open={isPaymentOpen}
          onOpenChange={setIsPaymentOpen}
          onSuccess={handlePaymentSuccess}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
        />
      )}
    </>
  );
};

export default MembershipPurchase;
