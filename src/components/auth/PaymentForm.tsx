import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";
import { CreditCard, Calendar, Lock } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "Номер карты должен содержать 16 цифр" })
    .max(19, { message: "Номер карты должен содержать не более 19 символов" })
    .regex(/^[0-9\s-]+$/, {
      message: "Номер карты должен содержать только цифры",
    }),
  cardHolder: z
    .string()
    .min(3, {
      message: "Имя владельца карты должно содержать не менее 3 символов",
    }),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: "Формат даты: ММ/ГГ" }),
  cvv: z
    .string()
    .min(3, { message: "CVV должен содержать 3 цифры" })
    .max(4, { message: "CVV должен содержать не более 4 цифр" })
    .regex(/^[0-9]+$/, { message: "CVV должен содержать только цифры" }),
});

type FormValues = z.infer<typeof formSchema>;

interface PaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (planName: string) => void;
  planName: string;
  planPrice: number;
}

const PaymentForm = ({
  open,
  onOpenChange,
  onSuccess,
  planName,
  planPrice,
}: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const formatCardNumber = (value: string) => {
    // Удаляем все нецифровые символы
    const cleaned = value.replace(/\D/g, "");
    // Группируем по 4 цифры
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    // Удаляем все нецифровые символы
    const cleaned = value.replace(/\D/g, "");
    // Форматируем как MM/YY
    if (cleaned.length > 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  const handleSubmit = async (values: FormValues) => {
    setIsProcessing(true);

    // Имитация процесса оплаты
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(planName);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border border-purple-700 text-white max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-purple-400">
              Оплата абонемента
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center">
              <div className="mb-2">
                План:{" "}
                <span className="font-semibold text-white">{planName}</span>
              </div>
              <div className="text-xl font-bold text-white">{planPrice} ₽</div>
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center my-4">
            <div className="flex space-x-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                alt="Mastercard"
                className="h-8"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="h-8"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Mir-logo.SVG/200px-Mir-logo.SVG.png"
                alt="Mir"
                className="h-8"
              />
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-300 flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Номер карты
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        className="bg-gray-900 border-purple-700 text-white"
                        maxLength={19}
                        {...field}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          field.onChange(formatted);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-300">
                      Имя владельца карты
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="IVAN IVANOV"
                        className="bg-gray-900 border-purple-700 text-white uppercase"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value.toUpperCase());
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-purple-300 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Срок действия
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MM/ГГ"
                          className="bg-gray-900 border-purple-700 text-white"
                          maxLength={5}
                          {...field}
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value);
                            field.onChange(formatted);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-purple-300 flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        CVV
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123"
                          type="password"
                          className="bg-gray-900 border-purple-700 text-white"
                          maxLength={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="text-xs text-gray-400 mt-2">
                <div className="flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  <span>Безопасная оплата с шифрованием SSL</span>
                </div>
                <p className="mt-1">
                  Ваши платежные данные не сохраняются на нашем сервере
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
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
                      Обработка платежа...
                    </>
                  ) : (
                    `Оплатить ${planPrice} ₽`
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentForm;
