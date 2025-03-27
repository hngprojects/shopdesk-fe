"use client";
import Works from "@/components/functional/Works";
import Testimonials from "@/components/functional/testimonials";
import airbnb from "@/public/home-images/airbnb.svg";
import coinbase from "@/public/home-images/coinbase.svg";
import displayScreenSm from "@/public/home-images/displayScreenSm.png";
import displayScreen from "@/public/home-images/displayscreen.svg";
import fiberplane from "@/public/home-images/fiberplane.svg";
import griffin from "@/public/home-images/griffin.svg";
import helpscout from "@/public/home-images/helpscout.svg";
import patreon from "@/public/home-images/patreon.svg";
import plaid from "@/public/home-images/plaid.svg";
import Desktop2 from "@/public/icons/Desktop 2.png";
import Check from "@/public/icons/check.png";
import Desktopsm from "@/public/icons/desktopsm.png";
import Play from "@/public/icons/play.png";
import right from "@/public/icons/right.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

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
      <p className="text-gray-700 text-lg leading-6 font-circular-light">
        {description}
      </p>

      <Link className="flex items-center gap-2" href="/sign-up">
        <button className="w-full cursor-pointer font-medium flex items-center text-left md:text-base text-sm ">
          {buttonText}
        </button>
        <Image
          src={right}
          alt="Arrow Right"
          className="w-3.5 h-3.5 cursor-pointer"
        />
      </Link>
    </div>
  );

  const ShopDeskFeatures: React.FC = () => {
    const features = [
      {
        iconSrc: "/icons/stock.svg",
        title: "Smart Stock Management",
        description:
          "Track stock in real-time and manage your products with confidence and precision. Our easy to use stock inventory solution helps you track and organize all your products all in real time.",
        buttonText: "Get Instant Business Insights",
        bgColor: "bg-blue-50",
      },
      {
        iconSrc: "/icons/note.svg",
        title: "Easy Sales Tracking",
        description:
          "Process transactions quickly, sync and update your inventory with every transaction that supports cash, card, and online payments for a fast checkout experience. ",
        buttonText: "Get Access To Sales Insights",
        bgColor: "bg-rose-50",
      },
      {
        iconSrc: "/icons/delete.svg",
        title: "Custom Reports & Insights",
        description:
          "Make smarter decisions with detailed sales and inventory reports. Monitor your revenue, identify best-selling products, and trends all in one dashboard.",
        buttonText: "Get Instant Business Insights",
        bgColor: "bg-yellow-50",
      },
    ];

    return (
      <section>
        <div className=" flex flex-col items-center gap-6 pt-10 max-w-[1000px] mx-auto px-5 min-[600px]:px-10">
          <h1
            className="text-[clamp(36px,_6vw,_60px)] max-w-[947px] leading-14 font-circular-bold md:leading-16 text-center"
            data-aos="fade-down"
            data-aos-once="false" // Allow this element to re-animate
          >
            <span className="text-[#19A45B]">Simplify</span> Inventory
            Management for Your Business
          </h1>

          <p
            className="text-gray-600 text-base leading-6 md:text-[24px] md:leading-9 font-circular-light text-center font-light min-[400px]:px-5"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-once="false" // Allow this element to re-animate
          >
            ShopDesk is a cloud based inventory management software that helps
            you track stock, process sales, and generate business records so you
            can focus on growing your business.
          </p>
        </div>

        <Link
          href="/sign-up"
          className="w-full flex justify-center items-center mt-8 -mb-4"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-once="false"
        >
          <button className="btn-primary">Start your free trial</button>
        </Link>

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
            hidden // hidden for now
            className="bg-[#19A45B] w-full px-[clamp(18px,_3vw,_80px)] p-6 flex items-center gap-[clamp(16px,_3vw,_48px)] justify-center flex-wrap h-fit"
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

        <div
          id="features"
          className="mx-auto max-w-[1198px] px-5 min-[600px]:px-10 pt-12"
        >
          <h2
            className="text-center py-4 md:py-3 font-medium leading-6 text-[#009A49]"
            data-aos="fade-up"
            data-aos-once="false" // Allow this element to re-animate
          >
            Key Features
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div
              className="flex flex-col gap-8 min-w-[300px]"
              data-aos="fade-right"
              data-aos-once="false" // Allow this element to re-animate
            >
              <div className="gap-2">
                <span className="text-sm leading-5 text-[#19A45B] mt-3 font-normal">
                  Stock Inventory
                </span>

                <h1 className="md:text-[54px] text-4xl font-bold leading-16">
                  Inventory
                </h1>

                <p className="text-gray-600 text-base font-light max-w-[512px]">
                  Manage your inventory with confidence and precision. Our
                  intuitive stock inventory solution helps you track, organize,
                  and optimize your products all in real time.
                </p>
              </div>

              <ul className="flex-col gap-6 leading-6 hidden md:flex">
                <li
                  className="flex items-center gap-2 text-base"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-once="false" // Allow this element to re-animate
                >
                  <span>
                    <Image src={Check} height={24} width={24} alt="" />
                  </span>
                  Real-Time Stock Tracking
                </li>
                <li
                  className="flex items-center gap-2 text-base"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-once="false" // Allow this element to re-animate
                >
                  <span>
                    <Image src={Check} height={24} width={24} alt="" />
                  </span>
                  Effortless Organization
                </li>
                <li
                  className="flex items-center gap-2 text-base"
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

            <div
              className="w-full max-w-[622px] bg-[#FAFAFA] p-2 pt-5 pr-0 hidden md:block"
              data-aos="fade-left"
              data-aos-once="false" // Allow this element to re-animate
            >
              <Image
                src={Desktop2}
                alt="Desktop"
                className="flex-1 overflow-hidden"
              />
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
          className="mx-auto max-w-[1198px] py-10 px-8"
          data-aos="fade-up"
          data-aos-once="false" // Allow this element to re-animate
        >
          <div className="flex items-stretch justify-center gap-4 flex-wrap">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        <div data-aos="fade-up" data-aos-once="false">
          <Works />
        </div>
        <div data-aos="fade-up" data-aos-once="false">
          <Testimonials />
        </div>
      </section>
    );
  };

  return <ShopDeskFeatures />;
}
