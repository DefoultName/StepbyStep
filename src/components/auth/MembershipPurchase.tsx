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

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
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
  open,
  onOpenChange,
  onSuccess,
}: MembershipPurchaseProps) => {
  const { purchaseMembership } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const plans: MembershipPlan[] = [
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

  const handlePurchase = (planId: string) => {
    const plan = plans.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
      setIsPaymentOpen(true);
    }
  };

  const handlePaymentSuccess = (planName: string) => {
    purchaseMembership(planName);
    if (onSuccess) {
      onSuccess();
    }
    setIsPaymentOpen(false);
    onOpenChange(false);
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
                        <span className="text-gray-400">/{plan.duration}</span>
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
