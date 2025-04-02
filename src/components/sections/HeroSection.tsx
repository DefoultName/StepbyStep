import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  videoSrc?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  title = "СТУДИЯ ТАНЦА STEP BY STEP",
  subtitle = "Где страсть встречается с движением. Начните свой танцевальный путь с нами.",
  ctaText = "Начать бесплатно",
  videoSrc = "https://player.vimeo.com/external/517090081.hd.mp4?s=90e95145af79b0d0066676d5c7b6a2d4a6b5f5c0&profile_id=175&oauth2_token_id=57447761",
  onCtaClick = () => (window.location.href = "/contact"),
}: HeroSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Video Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale, opacity }}
      >
        <div className="absolute inset-0 bg-black/50 z-10" /> {/* Overlay */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
        >
          <source src={videoSrc} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 md:px-8 lg:px-16"
        style={{ y, opacity }}
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={onCtaClick}
            size="lg"
            className="bg-purple-700 hover:bg-purple-800 text-white border-2 border-purple-500 rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          >
            {ctaText}
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/80 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
