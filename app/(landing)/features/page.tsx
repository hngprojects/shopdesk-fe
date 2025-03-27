"use client"; // Add this at the top since we're using useEffect

import React, { useEffect } from "react";
import Hero from "./components/hero";
import AOS from 'aos';
import 'aos/dist/aos.css';
import StockManagementSection from "./components/StockManagement";
import EasySalesTracking from "./components/EasySalesTracking";
import Reports from "./components/Reports";
import HowItWorksPage from "./components/HowItWorks";

const Page = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  return (
    <div className="max-w-9xl space-y-10 lg:space-y-12 mt-18">
      <Hero />
      <StockManagementSection />
      <EasySalesTracking />
      <Reports />
      <HowItWorksPage />
    </div>
  );
};

export default Page;