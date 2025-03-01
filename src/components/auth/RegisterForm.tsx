import React from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Имя должно содержать не менее 2 символов" }),
    email: z
      .string()
      .email({
        message: "Пожалуйста, введите действительный адрес электронной почты",
      }),
    phone: z
      .string()
      .min(10, {
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  onLoginClick: () => void;
}

const RegisterForm = ({
  open,
  onOpenChange,
  onSuccess,
  onLoginClick,
}: RegisterFormProps) => {
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

  const handleSubmit = async (values: FormValues) => {
    try {
      await register(values.name, values.email, values.password, values.phone);
      if (onSuccess) {
        onSuccess();
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
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
      </DialogContent>
    </Dialog>
  );
};

export default RegisterForm;
