import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Имя должно содержать не менее 2 символов" }),
  email: z.string().email({
    message: "Пожалуйста, введите действительный адрес электронной почты",
  }),
  phone: z
    .string()
    .min(10, { message: "Пожалуйста, введите действительный номер телефона" }),
  experience: z.string({
    required_error: "Пожалуйста, выберите ваш уровень опыта",
  }),
  classType: z.string({
    required_error: "Пожалуйста, выберите тип занятия",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface FreeTrialFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (values: FormValues) => void;
}

const FreeTrialForm = ({
  open = true,
  onOpenChange,
  onSubmit: externalOnSubmit,
}: FreeTrialFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      experience: "",
      classType: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    // Handle form submission
    console.log("Form submitted:", values);
    alert("Спасибо за регистрацию! Мы свяжемся с вами в ближайшее время.");
    if (externalOnSubmit) {
      externalOnSubmit(values);
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
              Запишитесь на бесплатное пробное занятие
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center">
              Заполните форму ниже, чтобы забронировать место на бесплатном
              пробном занятии.
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
                    <FormLabel className="text-purple-300">
                      Полное имя
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите ваше полное имя"
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
                    <FormLabel className="text-purple-300">
                      Номер телефона
                    </FormLabel>
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
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-300">
                      Танцевальный опыт
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-900 border-purple-700 text-white">
                          <SelectValue placeholder="Выберите ваш уровень опыта" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-purple-700 text-white">
                        <SelectItem value="beginner">
                          Начинающий (0-1 год)
                        </SelectItem>
                        <SelectItem value="intermediate">
                          Средний (1-3 года)
                        </SelectItem>
                        <SelectItem value="advanced">
                          Продвинутый (3+ лет)
                        </SelectItem>
                        <SelectItem value="professional">
                          Профессионал
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="classType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-300">
                      Предпочитаемый тип занятия
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-900 border-purple-700 text-white">
                          <SelectValue placeholder="Выберите тип занятия" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-purple-700 text-white">
                        <SelectItem value="contemporary">
                          Современные танцы
                        </SelectItem>
                        <SelectItem value="hiphop">Хип-Хоп</SelectItem>
                        <SelectItem value="ballet">Балет</SelectItem>
                        <SelectItem value="jazz">Джаз</SelectItem>
                        <SelectItem value="breakdance">Брейк-данс</SelectItem>
                      </SelectContent>
                    </Select>
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
                  Записаться на пробное занятие
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default FreeTrialForm;
