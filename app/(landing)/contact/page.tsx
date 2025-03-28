"use client";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';
import Heading from "./components/Heading";
import Form from "./components/Form";
import ContactInfoSection from "./components/ContactInfo";

const ContactPage = () => {
  useEffect(() => {
    Aos.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      mirror: false
    });
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center">
        <div className="w-full mx-auto">
          <Heading />
          <div className="py-12 md:py-16">
            <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-center">
              <div 
                className="w-full lg:w-[65%]" 
                data-aos="fade-up" 
                data-aos-delay="100"
              >
                <Form />
              </div>

              <div 
                className="w-full lg:w-[40%]"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <ContactInfoSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;