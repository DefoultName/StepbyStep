import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  autoRotateInterval?: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Сара Иванова",
    role: "Ученица балета",
    quote:
      "Эта танцевальная студия преобразила мою технику и уверенность. Инструкторы мирового класса действительно заботятся о вашем развитии как танцора.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    id: 2,
    name: "Михаил Чен",
    role: "Энтузиаст хип-хопа",
    quote:
      "Я пробовал многие студии, но ни одна не сравнится с энергией и сообществом здесь. Занятия хип-хопом инновационные, а инструкторы помогают раскрыть ваш потенциал.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
  },
  {
    id: 3,
    name: "Аиша Уильямс",
    role: "Танцор современных танцев",
    quote:
      "Программа современного танца здесь исключительная. Я так выросла как артист и нашла свой уникальный стиль благодаря их руководству.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha",
  },
  {
    id: 4,
    name: "Давид Родригес",
    role: "Родитель",
    quote:
      "Моя дочь расцвела с тех пор, как присоединилась к этой студии. Инструкторы создают поддерживающую среду, где она чувствует уверенность в самовыражении.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
  },
  {
    id: 5,
    name: "Эмма Томпсон",
    role: "Ученица джаза",
    quote:
      "Программа джаза превосходна! Я значительно улучшила свои навыки и нашла друзей на всю жизнь. Эта студия ощущается как мой второй дом.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
  },
];

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials = defaultTestimonials,
  autoRotateInterval = 5000,
}) => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  // Auto-rotation effect
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [api, autoRotateInterval]);

  return (
    <section className="w-full py-16 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-400">
            Что говорят наши ученики
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </motion.div>

        <Carousel
          setApi={setApi}
          className="w-full max-w-4xl mx-auto"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-full">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center p-6 text-center"
                >
                  <div className="w-20 h-20 mb-6 rounded-full overflow-hidden border-2 border-purple-500">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <blockquote className="text-lg md:text-xl italic mb-6 text-gray-300">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <h4 className="font-bold text-xl text-purple-400">
                      {testimonial.name}
                    </h4>
                    <p className="text-yellow-500">{testimonial.role}</p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious
              className="relative inset-auto bg-purple-900 hover:bg-purple-800 border-purple-700 text-white"
              variant="outline"
            >
              <ChevronLeft className="h-5 w-5" />
            </CarouselPrevious>
            <div className="flex items-center gap-2 mx-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all ${current === index ? "bg-yellow-500 scale-125" : "bg-gray-600"}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <CarouselNext
              className="relative inset-auto bg-purple-900 hover:bg-purple-800 border-purple-700 text-white"
              variant="outline"
            >
              <ChevronRight className="h-5 w-5" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
