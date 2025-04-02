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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите действительный адрес электронной почты",
  }),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать не менее 6 символов" }),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick: () => void;
}

const LoginForm = ({ onSuccess, onRegisterClick }: LoginFormProps) => {
  const { login } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      await login(values.email, values.password);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Ошибка входа:", error);
      // Show error to user
      form.setError("email", {
        type: "manual",
        message:
          error.message ||
          "Ошибка при входе. Пожалуйста, проверьте ваши данные.",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center text-purple-400">
          Вход в личный кабинет
        </DialogTitle>
        <DialogDescription className="text-gray-300 text-center">
          Введите данные для входа в ваш аккаунт
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 mt-4"
        >
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-300">Пароль</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите ваш пароль"
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
              Войти
            </Button>
          </motion.div>

          <div className="text-center mt-4">
            <p className="text-gray-400">
              Нет аккаунта?{" "}
              <button
                type="button"
                onClick={onRegisterClick}
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Зарегистрироваться
              </button>
            </p>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default LoginForm;
