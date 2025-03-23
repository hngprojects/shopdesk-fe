"use client";
import Footer from "@/components/functional/footer";
import Header from "@/components/functional/header";
import Testimonials from "@/components/functional/testimonials";
import { Features } from "./landFeatures";
import airbnb from "@/public/home-images/airbnb.svg";
import coinbase from "@/public/home-images/coinbase.svg";
import displayScreenSm from "@/public/home-images/displayScreenSm.png";
import displayScreen from "@/public/home-images/displayscreen.svg";
import fiberplane from "@/public/home-images/fiberplane.svg";
import griffin from "@/public/home-images/griffin.svg";
import helpscout from "@/public/home-images/helpscout.svg";
import patreon from "@/public/home-images/patreon.svg";
import plaid from "@/public/home-images/plaid.svg";
import play from "@/public/coming-soon/Icon.svg";
import Desktop2 from "@/public/icons/Frame.svg";
import Check from "@/public/icons/check.png";
import Desktopsm from "@/public/icons/desktopsm.png";
import Play from "@/public/icons/play.png";
import logo from "@/public/icons/logo.svg";
import right from "@/public/icons/right.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useEffect } from "react";
import Pricing from "./landPricing";
import FAQAccordion from "./landFaqAccordion";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false, // Allow animations to replay
      offset: 100,
    });
  }, []);


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

  const fadeRight = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
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
  interface FeatureCardProps {
    iconSrc: string;
    title: string;
    description: string;
    buttonText: string;
    bgColor: string;
  }

  const FeatureCard: React.FC<FeatureCardProps> = ({
    iconSrc,
    title,
    description,
    buttonText,
    bgColor,
  }) => (
    <div
      className={`rounded-[20px] flex flex-1 min-w-[300px] max-w-[400px] flex-col justify-between gap-5 items-start p-4 ${bgColor}`}
      data-aos="fade-up"
      data-aos-delay="100"
      data-aos-once="false" // Allow this element to re-animate
    >
      <img src={iconSrc} alt={title} className="w-8 h-8 mb-4 mt-2.5" />
      <h3 className="text-2xl leading-6 font-medium text-gray-900">{title}</h3>
      <p className="text-gray-700 text-lg leading-6">{description}</p>
      <div className="flex items-center gap-2">
        <button className="w-full text-green-600 cursor-pointer font-medium flex items-center text-left md:text-base text-sm ">
          {buttonText}
        </button>
        <Image
          src={right}
          alt="Arrow Right"
          className="w-3.5 h-3.5 cursor-pointer"
        />
      </div>
    </div>
  );

  const ShopDeskFeatures: React.FC = () => {


    return (
      <section>
        <Header />
        <div className=" flex flex-col items-center gap-6 pt-10 max-w-[1000px] mx-auto px-5 min-[600px]:px-10">
        <h1 className="text-[clamp(36px,_6vw,_60px)] max-w-[947px] leading-14 font-circular-bold md:leading-16 text-center">
        Affordable Cloud-Based <span className="text-green-300">Sales & Inventory</span> Software for Retailers
      </h1>
      <p className="mt-4 text-lg max-w-2xl text-[#5F5F5F]">
        Simplify Sales, Track Inventory, and Grow Your Business
      </p>
      <Link href="/sign-up" className="mt-6 bg-black text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-gray-900">
        Start for Free
      </Link>
        </div>

        <div className="w-full md:mt-[40px] mt-[20px] flex flex-col items-center">
          <Image
            src={displayScreen}
            alt="Display screen"
            className="w-[clamp(320px,_70vw,_850px)] max-w-[850px] hidden md:block"
            data-aos="zoom-in"
            data-aos-delay="300"
            data-aos-once="false" // Allow this element to re-animate
          />
          <Image
            src={displayScreenSm}
            alt="Display screen"
            className="w-[clamp(320px,_70vw,_850px)] max-w-[850px] md:hidden mb-6"
            data-aos="zoom-in"
            data-aos-delay="300"
            data-aos-once="false" // Allow this element to re-animate
          />

          <div
            className="bg-[#19A45B] w-full px-[clamp(18px,_3vw,_80px)] p-6 flex items-center gap-[clamp(16px,_3vw,_48px)] justify-center flex-wrap h-[101px]"
            data-aos="fade-up"
            data-aos-once="false" // Allow this element to re-animate
          >
            {[
              patreon,
              airbnb,
              fiberplane,
              coinbase,
              griffin,
              helpscout,
              plaid,
            ].map((logo, index) => (
              <Image
                key={index}
                src={logo}
                alt="Logo"
                className="w-[clamp(70px,_11vw,_140px)]"
                data-aos="fade-up"
                data-aos-delay={`${(index + 1) * 100}`}
                data-aos-once="false" // Allow this element to re-animate
              />
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1198px] px-5 min-[600px]:px-10 my-9">
          <div className="flex flex-col gap-[20px] px-[32px] items-center my-2">
            <p className="py-2 px-4 rounded-[24px] md:bg-[rgba(0,154,73,0.05)] text-[#009A49] font-[500] text-[16px] leading-[24px]">
              Simplify Sales, Track Inventory, and Grow Your Business
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-[2rem]">
            <div
              className="flex flex-col gap-1 min-w-[300px]"
              data-aos="fade-right"
              data-aos-once="false" // Allow this element to re-animate
            >
              {/* <div className="gap-2"> */}
                <p className="text-gray-600 text-base font-light max-w-[512px]">
                  Managing your retail business just got easier. Shopdesk is an
                  affordable, cloud-based inventory and sales management system
                  that helps you:
                </p>
              {/* </div> */}

              <ul className="flex flex-col gap-6 leading-6 mt-10 text-left max-w-2xl">
        <li className="flex items-center gap-2 text-base">
          <Image src={Check} height={24} width={24} alt="check-icon" />
          Track inventory in real-time – Know what’s in stock and when to restock.
        </li>
        <li className="flex items-center gap-2 text-base">
          <Image src={Check} height={24} width={24} alt="check-icon" />
          Record and manage sales effortlessly – Log every transaction with ease.
        </li>
        <li className="flex items-center gap-2 text-base">
          <Image src={Check} height={24} width={24} alt="check-icon" />
          Generate instant receipts – Print or send digital receipts in seconds.
        </li>
        <li className="flex items-center gap-2 text-base">
          <Image src={Check} height={24} width={24} alt="check-icon" />
          View sales history and reports – Gain insights into your business performance.
        </li>
        <li className="flex items-center gap-2 text-base">
          <Image src={Check} height={24} width={24} alt="check-icon" />
          Access your data anytime, anywhere – Manage your business from any device.
        </li>
      </ul>
            </div>

            <div
              className="w-full max-w-[622px] bg-[#FAFAFA] p-2 pt-5 pr-0 hidden md:block"
              data-aos="fade-left"
              data-aos-once="false" // Allow this element to re-animate
            >
              <Image src={Desktop2} alt="Desktop" className="flex-1 " />
            </div>

            <div className="w-full max-w-[450px] mt-4 flex flex-col items-center p-1 rounded-3xl md:hidden">
              <div
                className="bg-[#FAFAFA] pt-1.5 px-1.5 pb-0 rounded-tl-3xl rounded-tr-3xl w-full"
                data-aos="fade-up"
                data-aos-once="false" // Allow this element to re-animate
              >
                <Image
                  src={Desktopsm}
                  alt="Desktop"
                  className="overflow-hidden h-[201px]"
                />
              </div>

              <ul className="flex flex-col gap-6 text-base leading-6 md:hidden pt-8 self-start">
                <li
                  className="flex items-center gap-2"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-once="false" // Allow this element to re-animate
                >
                  <span>
                    <Image src={Check} height={24} width={24} alt="" />
                  </span>
                  Automated Alerts
                </li>
                <li
                  className="flex items-center gap-2"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-once="false" // Allow this element to re-animate
                >
                  <span>
                    <Image src={Check} height={24} width={24} alt="" />
                  </span>
                  Comprehensive Reporting
                </li>
                <li
                  className="flex items-center gap-2"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  data-aos-once="false" // Allow this element to re-animate
                >
                  <span>
                    <Image src={Play} height={24} width={24} alt="" />
                  </span>
                  Streamline Your Inventory Now
                </li>
              </ul>
            </div>
          </div>
        </div>
     
        <div
          data-aos="fade-up"
          data-aos-once="false" // Allow this element to re-animate
        >
          <Features text="Why Retailers Choose ShopDesk" />
        </div>
        <div>
          <div className="flex flex-col gap-[20px] px-[32px] items-center">
            <p className="py-2 px-4 rounded-[24px] md:bg-[rgba(0,154,73,0.05)] text-[#009A49] font-[500] text-[16px] leading-[24px]">
              See How Shopdesk Works in Just 60 Seconds!
            </p>
          </div>
          <div className="flex flex-col gap-[20px] px-[14rem] py-[16px] items-center">
            <h1 className="font-semibold text-[36px] leading-[44px] text-center px-[4rem]">
              Sign up now to secure your spot and get an exclusive discount when
              we launch.
            </h1>
          </div>

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
              src={logo}
              alt="Person holding a crate of oranges"
              width={100}
              height={100}
              className="w-full h-full"
            />
        </motion.div>

     
        <div className="relative w-full h-[500px]">
  <iframe
    className="w-full h-full"
    src="https://drive.google.com/file/d/1PT9nTD26pwDUmQJNYKwG9jht5Rv8THPT/preview"
    allow="autoplay"
  ></iframe>
  <div className="absolute inset-0 bg-black/30 bg-opacity-50 pointer-events-none"></div>
</div>

      </motion.div>

      <h2 className="text-center text-2xl font-bold mt-6">Your Smart Business Sidekick!</h2>
    </section>
        </div>

        <div
          data-aos="fade-up"
          data-aos-once="false" // Allow this element to re-animate
        >
          <Pricing />
        </div>

        <section className="p-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-5 px-8 items-center py-7">
            <p className="py-2 px-4 rounded-[24px] md:bg-[rgba(0,154,73,0.05)] text-[#009A49] font-[500] text-[16px] leading-[24px]">
              Get Exclusive Access & Updates
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-8">
            {/* Left Section */}
            <div className="md:w-1/2">
              <p className="text-gray-800 font-semibold text-xl mb-4">
                Sign up now to receive:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 text-lg">
                  <Image
                    src="/pricing/_Checkbox Base.svg"
                    alt="checkbox base"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  Early access before the official launch
                </li>
                <li className="flex items-center text-gray-700 text-lg">
                  <Image
                    src="/pricing/_Checkbox Base.svg"
                    alt="checkbox base"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  Exclusive discounts for early users
                </li>
                <li className="flex items-center text-gray-700 text-lg">
                  <Image
                    src="/pricing/_Checkbox Base.svg"
                    alt="checkbox base"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  Free guide: "How to Manage Inventory & Boost Sales"
                </li>
              </ul>
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 mt-6 md:mt-0">
              <form className="space-y-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-300 text-lg"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-300 text-lg"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-300 text-lg"
                />
                <button className="w-full p-4 bg-[#2A2A2A] text-white rounded-lg font-semibold text-lg hover:bg-[#2A2A2A]/70">
                  Sign Up Now
                </button>
              </form>
            </div>
          </div>
        </section>

        <FAQAccordion />

        <div className="bg-[#19A45B] text-white py-16 flex flex-col items-center text-center px-4 my-9">
          <span className="bg-[#0000001A] text-sm text-white px-4 py-2 rounded-full mb-4">
            Get Early Access – Only <span className="text-black">50 Spots</span>{" "}
            Left!
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold max-w-2xl">
            <span className="text-black font-bold">Shopdesk</span> is
            transforming how small businesses manage inventory and sales.
          </h2>
          <p className="mt-4 max-w-2xl">
            Be among the first to experience effortless retail management.
          </p>
          <p className="mt-2 max-w-2xl">
            Sign up now and claim your early-bird discount.
          </p>
          <button className="mt-6 bg-black text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-gray-900">
            Join the Waitlist Now
          </button>
        </div>

        <Footer />
      </section>
    );
  };

  return <ShopDeskFeatures />;
}
