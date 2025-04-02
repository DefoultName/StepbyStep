import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, User } from "lucide-react";
import ProfileDialog from "../auth/ProfileDialog";
import { useAuth } from "../auth/AuthContext";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !transparent ? "bg-black/95 shadow-lg" : "bg-transparent"}`;

  const navLinks = [
    {
      name: "Занятия",
      path: "/classes",
      hasDropdown: true,
      dropdownItems: [
        { name: "Балет", path: "/classes/ballet" },
        { name: "Современные танцы", path: "/classes/contemporary" },
        { name: "Хип-Хоп", path: "/classes/hip-hop" },
        { name: "Джаз", path: "/classes/jazz" },
      ],
    },
    { name: "Расписание", path: "/schedule", hasDropdown: false },
    { name: "Абонементы", path: "/membership", hasDropdown: false },
    { name: "О нас", path: "/about", hasDropdown: false },
    { name: "Контакты", path: "/contact", hasDropdown: false },
  ];

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-purple-400">STEP BY</span>
          <span className="text-2xl font-light text-white">STEP</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.hasDropdown ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center text-white hover:text-purple-400 transition-colors">
                      {link.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black/95 border-purple-500">
                    {link.dropdownItems?.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link
                          to={item.path}
                          className="text-white hover:text-purple-400 cursor-pointer"
                        >
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  to={link.path}
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <ProfileDialog
            trigger={
              <Button
                variant="ghost"
                className="text-white hover:text-purple-400 hover:bg-transparent flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                {isAuthenticated ? user?.name || "Профиль" : "Войти"}
              </Button>
            }
          />
          <Button
            onClick={() => (window.location.href = "/contact")}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Пробное занятие
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-black/95 text-white border-purple-500 w-[300px] p-0"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6 text-white" />
                </Button>
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <div
                    key={link.name}
                    className="border-b border-gray-800 pb-4"
                  >
                    {link.hasDropdown ? (
                      <div className="space-y-4">
                        <div className="text-lg font-medium text-purple-400">
                          {link.name}
                        </div>
                        <div className="pl-4 flex flex-col space-y-3">
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="text-white hover:text-purple-400"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-lg font-medium text-white hover:text-purple-400"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto space-y-4 pt-6">
                <ProfileDialog
                  trigger={
                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-purple-600 hover:text-white hover:border-transparent flex items-center justify-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      {isAuthenticated ? user?.name || "Профиль" : "Войти"}
                    </Button>
                  }
                />
                <Button
                  onClick={() => {
                    window.location.href = "/contact";
                    setIsOpen(false);
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Пробное занятие
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
