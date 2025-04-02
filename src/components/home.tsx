import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./auth/AuthContext";

// Import components
import Navbar from "./layout/Navbar";
import HeroSection from "./sections/HeroSection";
import ClassesPreview from "./sections/ClassesPreview";
import SchedulePreview from "./sections/SchedulePreview";
import MembershipSection from "./sections/MembershipSection";
import AboutPreview from "./sections/AboutPreview";
import TestimonialsSection from "./sections/TestimonialsSection";
import FreeTrialForm from "./forms/FreeTrialForm";
import Footer from "./layout/Footer";

const Home = () => {
  const [isTrialFormOpen, setIsTrialFormOpen] = useState(false);
  const { user } = useAuth();

  // Запрашиваем разрешение на отправку уведомлений при загрузке страницы
  useEffect(() => {
    if (
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission();
    }
  }, []);

  const handleTrialButtonClick = useCallback(() => {
    setIsTrialFormOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navbar transparent={true} />

      {/* Hero Section */}
      <HeroSection onCtaClick={handleTrialButtonClick} />

      {/* Classes Preview */}
      <ClassesPreview />

      {/* Schedule Preview */}
      <SchedulePreview />

      {/* Membership Section */}
      <MembershipSection />

      {/* About Preview */}
      <AboutPreview />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer onTrialButtonClick={handleTrialButtonClick} />

      {/* Free Trial Form Modal */}
      <FreeTrialForm
        open={isTrialFormOpen}
        onOpenChange={setIsTrialFormOpen}
        onSubmit={(values) => {
          console.log("Trial form submitted:", values);
          setIsTrialFormOpen(false);
          // Here you would typically send the form data to your backend
        }}
      />
    </div>
  );
};

export default Home;
