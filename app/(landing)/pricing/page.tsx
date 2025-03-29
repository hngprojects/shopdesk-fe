"use client"

import { Metadata } from "next";
import Pricing from "./_components/Pricing";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


const PricingPage = () => {

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  return <Pricing />;
};

export default PricingPage;

