import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

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
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  open = false,
  onOpenChange,
  onSubmit: externalOnSubmit,
}: FreeTrialFormProps) => {
  const [activeTab, setActiveTab] = useState<string>("form");
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

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset();
      setActiveTab("form");
      setShowSuccessMessage(false);
    }
  }, [open, form]);

  const handleSubmit = (values: FormValues) => {
    // Handle form submission
    console.log("Form submitted:", values);

    // Показываем красивое уведомление
    setShowSuccessMessage(true);

    // Скрываем уведомление через 5 секунд
    setTimeout(() => {
      setShowSuccessMessage(false);
      if (externalOnSubmit) {
        externalOnSubmit(values);
      }
      if (onOpenChange) {
        onOpenChange(false);
      }
    }, 5000);
  };

  const handleShowMap = () => {
    setActiveTab("map");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border border-purple-700 text-white max-w-md w-full relative">
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
                Спасибо за регистрацию!
              </h3>
              <p className="text-gray-200 mb-4">
                Мы свяжемся с вами в ближайшее время для подтверждения пробного
                занятия.
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
              Запишитесь на бесплатное пробное занятие
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center">
              Заполните форму ниже, чтобы забронировать место на бесплатном
              пробном занятии.
            </DialogDescription>
          </DialogHeader>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-900">
              <TabsTrigger value="form" className="text-purple-300">
                Форма
              </TabsTrigger>
              <TabsTrigger value="map" className="text-purple-300">
                Карта
              </TabsTrigger>
            </TabsList>
            <TabsContent value="form" className="mt-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
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
                        <FormLabel className="text-purple-300">
                          Эл. почта
                        </FormLabel>
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
                            <SelectItem value="breakdance">
                              Брейк-данс
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleShowMap}
                      className="bg-transparent border border-purple-600 text-purple-400 hover:bg-purple-900 hover:text-white"
                    >
                      <MapPin className="mr-2 h-4 w-4" /> Посмотреть на карте
                    </Button>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 ml-2"
                    >
                      <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3"
                      >
                        Записаться
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="map" className="mt-4">
              <div className="space-y-4">
                <div
                  className="bg-gray-900 rounded-md overflow-hidden h-[350px] relative"
                  aria-label="Карта студии танцев"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.5919331876!2d71.41488867677893!3d51.09031437169251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424585a605525605%3A0x4dff4a6d5473d56!2sMega%20Silk%20Way!5e0!3m2!1sen!2skz!4v1693913271961!5m2!1sen!2skz"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Карта расположения студии танцев"
                  ></iframe>

                  <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center text-center p-4 bg-gray-800/90 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-purple-300 mb-1">
                      Mega Silk Way
                    </h3>
                    <p className="text-gray-300">Кабанбай Батыра, 62, Астана</p>
                    <p className="text-gray-400 text-sm">Блок C, 3 этаж</p>
                  </div>
                </div>

                <div className="text-purple-300 text-sm">
                  <p className="font-semibold mb-1">Наш адрес:</p>
                  <p>ТРЦ Mega Silk Way, Кабанбай Батыра, 62, Астана</p>
                  <p className="mt-2">
                    Студия находится на 3 этаже, блок C, рядом с фудкортом
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("form")}
                  className="w-full bg-transparent border border-purple-600 text-purple-400 hover:bg-purple-900 hover:text-white mt-2"
                >
                  Вернуться к форме
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default FreeTrialForm;
