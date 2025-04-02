import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";

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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Имя должно содержать не менее 2 символов" }),
    email: z.string().email({
      message: "Пожалуйста, введите действительный адрес электронной почты",
    }),
    phone: z.string().min(10, {
      message: "Пожалуйста, введите действительный номер телефона",
    }),
    password: z
      .string()
      .min(6, { message: "Пароль должен содержать не менее 6 символов" }),
    confirmPassword: z.string().min(1, { message: "Подтвердите пароль" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
  onLoginClick: () => void;
}

const RegisterForm = ({ onSuccess, onLoginClick }: RegisterFormProps) => {
  const { register } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      await register(values.name, values.email, values.password, values.phone);

      // Show success message
      setShowSuccessMessage(true);

      // Hide message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        if (onSuccess) {
          onSuccess();
        }
      }, 5000);
    } catch (error: any) {
      console.error("Ошибка регистрации:", error);
      // Show error to user
      form.setError("email", {
        type: "manual",
        message:
          error.message ||
          "Ошибка при регистрации. Пожалуйста, попробуйте снова.",
      });
    }
  };

  return (
    <div className="relative">
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-6 rounded-lg shadow-lg max-w-[90%] text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Регистрация успешна!
            </h3>
            <p className="text-gray-200 mb-4">
              Вы успешно зарегистрировались. Теперь вы можете пользоваться всеми
              возможностями личного кабинета.
            </p>
            <motion.div
              className="w-full bg-gray-700 h-1 rounded-full overflow-hidden"
              initial={{ width: "0%" }}
            >
              <motion.div
                className="h-full bg-purple-400"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-purple-400">
            Регистрация
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-center">
            Создайте аккаунт для доступа к личному кабинету
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-300">Имя</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите ваше имя"
                      className="bg-gray-900 border-purple-700 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-300">Эл. почта</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите ваш адрес эл. почты"
                      type="email"
                      className="bg-gray-900 border-purple-700 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-300">Телефон</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите ваш номер телефона"
                      type="tel"
                      className="bg-gray-900 border-purple-700 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-300">Пароль</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Создайте пароль"
                      type="password"
                      className="bg-gray-900 border-purple-700 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-300">
                    Подтверждение пароля
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Подтвердите пароль"
                      type="password"
                      className="bg-gray-900 border-purple-700 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3"
              >
                Зарегистрироваться
              </Button>
            </motion.div>

            <div className="text-center mt-4">
              <p className="text-gray-400">
                Уже есть аккаунт?{" "}
                <button
                  type="button"
                  onClick={onLoginClick}
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Войти
                </button>
              </p>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
