import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AboutPreview from "../components/sections/AboutPreview";
import TestimonialsSection from "../components/sections/TestimonialsSection";

const About = () => {
  const instructors = [
    {
      name: "Мария Иванова",
      role: "Художественный руководитель",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dance1",
      bio: "Профессиональная танцовщица с 15-летним опытом. Выпускница Московской академии хореографии. Лауреат международных конкурсов.",
    },
    {
      name: "Давид Чен",
      role: "Инструктор современных танцев",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dance2",
      bio: "Специалист по современной хореографии. Работал с ведущими танцевальными коллективами России и Европы. Преподает более 10 лет.",
    },
    {
      name: "София Родригес",
      role: "Инструктор балета",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dance3",
      bio: "Бывшая солистка балета. Окончила Академию русского балета им. А.Я. Вагановой. Преподает классический балет для всех возрастов.",
    },
    {
      name: "Алексей Петров",
      role: "Инструктор хип-хопа",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dance4",
      bio: "Чемпион России по хип-хопу. Участник международных баттлов и фестивалей. Разработал собственную методику обучения.",
    },
    {
      name: "Елена Смирнова",
      role: "Инструктор джаза",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dance5",
      bio: "Профессиональная танцовщица и хореограф. Специализируется на джазе и джаз-фанке. Постановщик шоу-программ для телевидения.",
    },
    {
      name: "Михаил Козлов",
      role: "Инструктор брейк-данса",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dance6",
      bio: "B-boy с 20-летним стажем. Участник и судья международных соревнований. Развивает брейк-данс культуру среди молодежи.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar transparent={false} />

      {/* Header */}
      <motion.div
        className="pt-32 pb-16 bg-gradient-to-b from-purple-900 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            О нашей студии
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Узнайте больше о нашей истории, миссии и команде профессиональных
            инструкторов, которые помогут вам раскрыть свой танцевальный
            потенциал.
          </p>
        </div>
      </motion.div>

      {/* About Section */}
      <AboutPreview />

      {/* Our Story */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="История студии"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-400">
                Наша история
              </h2>
              <p className="text-gray-300 mb-4">
                Студия танца "Step by Step" была основана в 2010 году группой
                профессиональных танцоров, объединенных общей страстью к
                танцевальному искусству и желанием делиться своими знаниями с
                другими.
              </p>
              <p className="text-gray-300 mb-4">
                Начав с небольшого помещения и всего трех направлений танца,
                сегодня мы выросли в одну из ведущих танцевальных студий города
                с просторными залами, профессиональным оборудованием и командой
                высококвалифицированных инструкторов.
              </p>
              <p className="text-gray-300">
                За годы работы мы помогли тысячам людей разного возраста и
                уровня подготовки раскрыть свой потенциал, обрести уверенность в
                себе и полюбить танец всем сердцем. Мы гордимся нашими
                учениками, многие из которых стали профессиональными танцорами и
                хореографами.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-purple-400">
              Наша миссия
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Мы верим, что танец — это не просто набор движений, а искусство
              самовыражения, способ познания себя и мира вокруг. Наша миссия —
              создать пространство, где каждый может раскрыть свой творческий
              потенциал, обрести радость движения и стать частью дружного
              танцевального сообщества.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Качество</h3>
                <p className="text-gray-400">
                  Мы стремимся к высочайшему качеству обучения, постоянно
                  совершенствуя наши методики
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Сообщество</h3>
                <p className="text-gray-400">
                  Мы создаем дружественную атмосферу, где каждый чувствует себя
                  частью команды
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Творчество</h3>
                <p className="text-gray-400">
                  Мы поощряем творческое самовыражение и индивидуальный подход к
                  танцу
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-400">
              Наша команда
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-300">
              Познакомьтесь с нашими профессиональными инструкторами, которые
              помогут вам достичь новых высот в танце
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black p-6 rounded-lg border border-purple-800"
              >
                <div className="flex items-center mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {instructor.name}
                    </h3>
                    <p className="text-purple-400">{instructor.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{instructor.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      <Footer />
    </div>
  );
};

export default About;
