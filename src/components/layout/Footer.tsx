import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface FooterProps {
  studioName?: string;
  address?: string;
  phone?: string;
  email?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  onTrialButtonClick?: () => void;
}

const Footer = ({
  studioName = "Студия танца Step by Step",
  address = "123 Танцевальный проспект, Москва, 101000",
  phone = "+7 (495) 123-4567",
  email = "info@stepbystep.ru",
  socialLinks = {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
  onTrialButtonClick,
}: FooterProps) => {
  const { toast } = useToast();

  const handleSubscribe = () => {
    const emailInput = document.getElementById(
      "newsletter-email",
    ) as HTMLInputElement;
    const emailValue = emailInput?.value;

    if (!emailValue || !emailValue.includes("@")) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный адрес электронной почты",
        variant: "destructive",
      });
      return;
    }

    // In a real application, you would send this to your backend
    // For now, we'll just show a success message
    console.log(`Subscription email: ${emailValue}`);

    // Clear the input field
    emailInput.value = "";

    // Show success message
    toast({
      title: "Успешно!",
      description: `Вы успешно подписались на рассылку с адресом ${emailValue}`,
      variant: "default",
    });
  };
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Studio Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-purple-400">
              {studioName}
            </h3>
            <p className="mb-6 text-gray-300">
              Раскройте свой потенциал через искусство танца. Присоединяйтесь к
              нашему яркому сообществу танцоров сегодня.
            </p>
            <div className="flex space-x-4">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  aria-label="Facebook"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Facebook size={20} />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  aria-label="Instagram"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  aria-label="Twitter"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Twitter size={20} />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  aria-label="YouTube"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-gold-400">
              Быстрые ссылки
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/classes"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/classes";
                  }}
                >
                  Занятия
                </a>
              </li>
              <li>
                <a
                  href="/schedule"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/schedule";
                  }}
                >
                  Расписание
                </a>
              </li>
              <li>
                <a
                  href="/membership"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/membership";
                  }}
                >
                  Абонементы
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/about";
                  }}
                >
                  О нас
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/contact";
                  }}
                >
                  Контакты
                </a>
              </li>
              {onTrialButtonClick && (
                <li>
                  <button
                    onClick={onTrialButtonClick}
                    className="text-gray-300 hover:text-purple-400 transition-colors flex items-center"
                  >
                    <CalendarCheck size={16} className="mr-1" />
                    Пробное занятие
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-gold-400">
              Связаться с нами
            </h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-purple-400" />
                <span className="text-gray-300">{address}</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-purple-400" />
                <a
                  href={`tel:${phone}`}
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  {phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 text-purple-400" />
                <a
                  href={`mailto:${email}`}
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  {email}
                </a>
              </div>
              {onTrialButtonClick && (
                <Button
                  onClick={onTrialButtonClick}
                  className="mt-3 bg-purple-600 hover:bg-purple-700 text-white w-full"
                >
                  <CalendarCheck size={16} className="mr-2" />
                  Записаться на пробное занятие
                </Button>
              )}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-gold-400">
              Будьте в курсе
            </h4>
            <p className="text-gray-300 mb-4">
              Подпишитесь на нашу рассылку, чтобы получать последние обновления
              о занятиях, мероприятиях и специальных предложениях.
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Ваш адрес эл. почты"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
                id="newsletter-email"
              />
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleSubscribe}
              >
                Подписаться
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {studioName}. Все права защищены.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a
              href="/privacy"
              className="hover:text-purple-400 transition-colors"
            >
              Политика конфиденциальности
            </a>
            <a
              href="/terms"
              className="hover:text-purple-400 transition-colors"
            >
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
