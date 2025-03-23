"use client"
import {  useState } from "react";
import Logo from "@/components/functional/logo";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import TestimonialCarousel from "./carousel";
import instagram from "@/public/icons/instagram.svg";
import facebook from "@/public/icons/facebook.svg";
import twitter from "@/public/icons/twitter.svg";
import manWithOranges from "@/public/smart-business/Group 362.png";
import greenStroke from "@/public/smart-business/Group 2282.svg";
import cardImage from "@/public/smart-business/Group 138.svg";
import Star from "@/public/smart-business/Star 9.svg";
import UnStar from "@/public/smart-business/Star 9 (1).svg";
import Log from "@/public/smart-business/_Logo Wrapper.svg";

const Page = () => {

  const fadeRight = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const features = [
    {
      icon: "/smart-business/activity 1.svg",
      title: "Automated Inventory Management",
      description:
        "Shopdesk helps small business owners like yours manage inventory, track sales and profits without the headache.",
    },
    {
      icon: "/smart-business/pie-chart 1.svg",
      title: "Easy Sales & Discount Management",
      description:
        "Apply discounts seamlessly and track every sale without errors.",
    },
    {
      icon: "/smart-business/command 1.svg",
      title: "Simple, Click-to-Generate Reports",
      description:
        "Instantly view best-selling products, total sales, and profit margins—no spreadsheets needed.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <header className="flex items-center justify-between py-4 px-6 md:px-12 lg:px-16">
        <motion.div 
          className="flex items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRight}
        >
          <Logo />
        </motion.div>

        <motion.div 
          className="flex space-x-4 max-[768px]:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeLeft}
        >
          <a
            href="https://x.com/shopdesk_?s=21"
            target="_blank"
            className="size-[50px] border border-[#D0D0D0] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Image src={twitter} alt="Twitter logo" className="size-6" />
          </a>
          <a
            href="https://www.facebook.com/share/18weYAqtPe/"
            target="_blank"
            className="size-[50px] border border-[#D0D0D0] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Image src={facebook} alt="Facebook logo" className="size-6" />
          </a>
          <a
            href="https://www.instagram.com/shopdesk_?igsh=MXIybG5sNXhvazI5dg=="
            target="_blank"
            className="size-[50px] border border-[#D0D0D0] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Image src={instagram} alt="Instagram logo" className="size-6" />
          </a>
        </motion.div>
      </header>

      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16 py-8 md:py-10">
        <motion.div 
          className="flex flex-col max-[768px]:items-center max-w-[587px] flex-1 max-[768px]:text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRight}
        >
          <h1 className="font-bold text-[75px] leading-[4rem] text-[#1A1A1A]">
            Run Your Business with Ease
          </h1>
          <div className="relative w-[300px] h-[10px] mt-2 mb-6">
            <Image
              src={greenStroke}
              alt="decorative green stroke"
              width={300}
              height={10}
              className="object-contain"
            />
          </div>
          <p className="text-[28px] text-[#5F5F5F] mt-4">
            Tired of missing stock, sales mix-ups, and endless paperwork? You're
            not alone! Whether you run a boutique, online store, or physical
            shop, managing your business shouldn't be this stressful.
          </p>
        </motion.div>

        <motion.div 
          className="relative mt-8 md:mt-0 max-w-[400px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeLeft}
        >
          <div className="">
            <Image
              src={manWithOranges}
              alt="Person holding a crate of oranges"
              width={800}
              height={800}
            />
          </div>
        </motion.div>
      </section>

       <section className="px-6 md:px-12 flex justify-center flex-col items-center lg:px-16 py-8 md:py-12">
      <motion.div
        className="relative w-full max-w-4xl border-[24px] border-[#00000080] rounded-lg overflow-hidden shadow-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={zoomIn}
      >
        <motion.div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRight}
        >
          <Image
              src={Log}
              alt="Person holding a crate of oranges"
              width={100}
              height={100}
              className="w-full h-full"
            />
        </motion.div>

     
        <div className="relative w-full h-[500px]">
  <iframe
    className="w-full h-full"
    src="https://drive.google.com/file/d/18nzV42E0r84vpeq9OxnZXsdmcrLhl16r/preview"
    allow="autoplay"
  ></iframe>
  <div className="absolute inset-0 bg-black/30 bg-opacity-50 pointer-events-none"></div>
</div>

      </motion.div>

      <h2 className="text-center text-2xl font-bold mt-6">Your Smart Business Sidekick!</h2>
    </section>

      <section className="bg-[#005026] text-white py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeRight}
          >
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Do you run out of bestsellers or overstock slow-moving products?
            </h2>
            <p className="text-[16px] text-gray-300 mb-6">
              Imagine focusing on selling more, delighting customers, and
              growing your brand—without stressing over inventory and reports.
            </p>

            <div className="flex gap-[5rem] mt-[5rem]">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: 0.1 }}
                className="flex flex-col gap-2"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Image
                    src={Star}
                    alt="Star"
                    width={22}
                    height={22}
                    key={i}
                    >

                    </Image>
                  ))}
                </div>
                <p className="font-bold mt-1">4.9 / 5 rating</p>
                <p className="text-white">ekon</p>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-2"

              >
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                     <Image
                     src={Star}
                     alt="Star"
                     width={22}
                     height={22}
                     key={i}
                     >
 
                     </Image>
                  ))}
                  <Image
                     src={UnStar}
                     alt="Star"
                     width={22}
                     height={22}
                     >
 
                     </Image>
                </div>
                <p className="font-bold mt-1">4.8 / 5 rating</p>
                <p className="text-white">roland</p>
              </motion.div>
            </div>
          </motion.div>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex gap-4 items-start"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeLeft}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-1 flex justify-center items-center bg-white w-8 h-8">
                  <Image
                    src={feature.icon}
                    width={30}
                    height={30}
                    alt={feature.title}
                    className="size-6"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row justify-between items-center p-8 gap-10 px-6 md:px-12 lg:px-16 py-16">
        <motion.div 
          className="relative max-w-xl self-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRight}
        >
          <div className="relative h-[300px] w-full">
            <Image 
              src={cardImage} 
              alt="Payment dashboard" 
              width={400} 
              height={300}
              className="w-full"
            />
            
            
          </div>
        </motion.div>

        <motion.div 
          className="max-w-lg w-full p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeLeft}
        >
          <h2 className="text-[48px] font-bold text-[#2A425D] text-center leading-[3rem]">
            Sign Up for <br /> Free Today
          </h2>
          <div className="relative w-full flex h-full justify-center my-4">
            <Image
              src={greenStroke}
              alt="Decorative stroke"
              width={600}
              height={20}
              className="object-contain"
            />
          </div>
          <form className="mt-4 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 p-3 rounded-md w-full"
            />
            <input
              type="email"
              placeholder="Email address"
              className="border border-gray-300 p-3 rounded-md w-full"
            />
            <div className="relative">
              <select className="border border-gray-300 p-3 rounded-md w-full appearance-none">
                <option>Business Type</option>
                <option>Retail</option>
                <option>Food Service</option>
                <option>E-commerce</option>
                <option>Other</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown size={20} />
              </div>
            </div>
            <input
              type="text"
              placeholder="Business Name (Optional)"
              className="border border-gray-300 p-3 rounded-md w-full"
            />
            <button className="bg-gray-800 text-white p-3 rounded-md w-full hover:bg-gray-900 transition-colors flex items-center justify-center">
              <span>Join Waitlist</span>
              <ArrowRight size={18} className="ml-2" />
            </button>
          </form>
        </motion.div>
      </section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <TestimonialCarousel />
      </motion.section>

      <footer className="py-6 px-4 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © Copyright 2025, Powered by Timbu Business
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-500 text-sm hover:text-gray-800"
            >
              Cookies
            </Link>
            <Link
              href="#"
              className="text-gray-500 text-sm hover:text-gray-800"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-500 text-sm hover:text-gray-800"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 text-sm hover:text-gray-800"
            >
              Manage privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;