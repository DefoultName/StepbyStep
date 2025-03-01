import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InstructorProps {
  name: string;
  role: string;
  image: string;
}

interface AboutPreviewProps {
  title?: string;
  description?: string;
  studioImage?: string;
  instructors?: InstructorProps[];
}

const InstructorCard = ({
  name = "Jane Doe",
  role = "Dance Instructor",
  image = "https://api.dicebear.com/7.x/avataaars/svg?seed=dance1",
}: InstructorProps) => {
  return (
    <motion.div
      className="flex flex-col items-center p-4"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h4 className="text-lg font-semibold text-white">{name}</h4>
      <p className="text-sm text-purple-300">{role}</p>
    </motion.div>
  );
};

const AboutPreview = ({
  title = "О нашей студии",
  description = "Основанная в 2010 году, наша танцевальная студия стала творческим домом для танцоров всех уровней. Мы верим в преобразующую силу танца для развития уверенности, дисциплины и радости. Наши современные помещения и увлеченные инструкторы создают среду, где каждый может преуспеть.",
  studioImage = "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  instructors = [
    {
      name: "Мария Иванова",
      role: "Художественный руководитель",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dance1",
    },
    {
      name: "Давид Чен",
      role: "Инструктор современных танцев",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dance2",
    },
    {
      name: "София Родригес",
      role: "Инструктор балета",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dance3",
    },
  ],
}: AboutPreviewProps) => {
  return (
    <section className="w-full py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-400">
              {title}
            </h2>
            <p className="text-gray-300">{description}</p>

            <div className="flex flex-wrap gap-4">
              {instructors.map((instructor, index) => (
                <InstructorCard
                  key={index}
                  name={instructor.name}
                  role={instructor.role}
                  image={instructor.image}
                />
              ))}
            </div>

            <Button
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white group"
              size="lg"
              onClick={() => (window.location.href = "/about")}
            >
              Узнать больше о нас
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <motion.div
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={studioImage}
              alt="Dance Studio Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
