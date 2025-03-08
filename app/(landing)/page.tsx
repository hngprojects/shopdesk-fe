import Image, { StaticImageData } from "next/image";
import Desktop from "@/public/icons/desktop-img.png";
import Desktop2 from "@/public/icons/Desktop 2.png";
import Mobile from "@/public/icons/mobile.png";
import Mobile2 from "@/public/icons/mobile2.png";
import Check from "@/public/icons/check.png";
import Play from "@/public/icons/play.png";
import Desktopsm from "@/public/icons/desktopsm.png";
import CarouselWrapper from "@/components/carouselWrapper";
import star from "@/public/icons/star.png";
import jerone from "@/public/icons/jerome bell.png";
import kristine from "@/public/icons/kristin watson.png";
import Annette from "@/public/icons/annette.png";

export default function Home() {

 
   
  interface FeatureCardProps {
    iconSrc: string;
    title: string;
    description: string;
    buttonText: string;
    bgColor: string;
  }

  interface Step {
    number: string;
    title: string;
    description: string;
    isActive: boolean;
  }

  const FeatureCard: React.FC<FeatureCardProps> = ({
    iconSrc,
    title,
    description,
    buttonText,
    bgColor,
  }) => (
    <div
      className={`rounded-[20px] w-[400px] h-[350px] flex flex-col gap-5 items-start p-4 ${bgColor}`}
    >
      <img src={iconSrc} alt={title} className="w-8 h-8 mb-4 mt-2.5" />
      <h3 className="text-2xl leading-6 font-medium text-gray-900">{title}</h3>
      <p className="text-gray-700 text-lg mt-2 leading-6">{description}</p>
      <button className="mt-2 text-green-600 font-medium flex items-center md:text-base text-sm leading-6">
        {buttonText} <span className="ml-1">→</span>
      </button>
    </div>
  );

  const companies = [
    { name: "Patreon", logo: "PATREON" },
    { name: "Airbnb", logo: "airbnb" },
    { name: "Fiberplane", logo: "fiberplane" },
    { name: "Coinbase", logo: "coinbase" },
    { name: "Griffin", logo: "Griffin" },
    { name: "HelpScout", logo: "HelpScout" },
    { name: "Plaid", logo: "PLAID" },
  ];

  const steps: Step[] = [
    {
      number: "01",
      title: "Easy Account Setup",
      description:
        "Create your Shopdesk account and easily add your products, pricing, and business details.",
      isActive: false,
    },
    {
      number: "02",
      title: "Sales and Stock Management",
      description:
        "Process sales quickly while Shopdesk automatically updates your inventory in real time.",
      isActive: true, // Active step
    },
    {
      number: "03",
      title: "Track and Analyze Reports",
      description:
        "Monitor sales, expenses, and stock levels with smart insights and custom reports.",
      isActive: false,
    },
    {
      number: "04",
      title: "Grow Your Business",
      description:
        "Make data-driven decisions, prevent stock issues, and boost profits with seamless shop management.",
      isActive: false,
    },
  ];

  const ShopDeskFeatures: React.FC = () => {
    const features = [
      {
        iconSrc: "/icons/stock.svg",
        title: "Stock Management",
        description:
          "Manage your inventory with confidence and precision. Our intuitive stock inventory solution helps you track, organize, and optimize your products all in real time.",
        buttonText: "Streamline Your Inventory Now",
        bgColor: "bg-blue-50",
      },
      {
        iconSrc: "/icons/sales.svg",
        title: "Sales Tracking",
        description:
          "ShopDesk automatically updates your inventory with every transaction and supports cash, card, and online payments for a seamless checkout experience.",
        buttonText: "Get Real-Time Sales Insights",
        bgColor: "bg-rose-50",
      },
      {
        iconSrc: "/icons/custom.svg",
        title: "Custom Reports",
        description:
          "Make smarter decisions with detailed sales and inventory reports. Track your revenue, identify best-selling products, and monitor profits—all in one dashboard.",
        buttonText: "Get Instant Business Insights",
        bgColor: "bg-yellow-50",
      },
    ];

    return (
      <section>
        <div className="relative">
          <div className=" flex flex-col items-center gap-8 pt-10 pb-5 max-w-[867px] p-6 mx-auto">
            <h1 className="text-4xl leading-14 font-bold md:text-6xl md:leading-16 md:-tracking-[3.5px] text-center">
              <span className="text-green-500">Simplify</span> Inventory
              Management for Your Business
            </h1>

            <p className="text-gray-600 text-base leading-6  md:text-3xl md:leading-9 font-medium text-center">
              Start with a stunning homepage. Stay motivated without hurting
              your pocket.
            </p>

            <button className="btn-primary">Start Your Free Trial</button>

            <figure className="max-w-[854px] mx-auto">
              <div className="relative">
                <Image
                  src={Desktop}
                  alt="Desktop dashboard"
                  className="w-[283px] h-[232px] md:w-[857px] md:h-[500px]"
                />
                <Image
                  src={Mobile}
                  alt="Desktop dashboard"
                  className="absolute top-[32px] -right-10 md:top-[70px] md:-right-24 w-[106px] h-[210px] md:w-[295px] md:h-[420px]"
                />
              </div>
            </figure>

            <div className="h-[117px] md:h-[115px] right-0 flex items-center flex-wrap left-0 absolute bottom-1 bg-green-500 md:bottom-5 p-6 px-[18px]">
              <div className=" px-4">
                <div className="flex flex-wrap justify-center items-center space-x-6 md:space-x-12">
                  {companies.map((company) => (
                    <div
                      key={company.name}
                      className="text-white  text-lg font-bold"
                    >
                      {company.logo}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1198px] px-6">
          <h2 className="text-center py-8 md:py-3 font-medium leading-6 text-green-500">
            Key Features
          </h2>

          <div className="max-w-[1198px] flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex flex-col gap-8">
              <span className="text-base leading-5 text-green-500 font-bold">
                Stock Inventory
              </span>

              <h1 className="md:text-[54px] text-4xl font-bold leading-16">
                Inventory
              </h1>

              <p className="text-gray-600 text-base leading-[22px] max-w-[512px]">
                Manage your inventory with confidence and precision. Our
                intuitive stock inventory solution helps you track, organize,
                and optimize your products all in real time.
              </p>

              <ul className="flex-col gap-6 text-base leading-6 hidden md:flex">
                <li className="flex items-center gap-2">
                  <span>
                    <Image src={Check} height={24} width={24} alt="" />
                  </span>
                  Automated Alerts
                </li>
                <li className="flex items-center gap-2">
                  <span>
                    <Image src={Check} height={24} width={24} alt="" />
                  </span>
                  Comprehensive Reporting
                </li>
                <li className="flex items-center gap-2">
                  <span>
                    <Image src={Play} height={24} width={24} alt="" />
                  </span>
                  Streamline Your Inventory Now
                </li>
              </ul>
            </div>

            <figure className="max-w-[622px]">
              <div className="w-full bg-[#FAFAFA] p-2 pt-5 pr-0 rounded-tl-[48px] hidden md:block">
                <Image
                  src={Desktop2}
                  alt="Desktop"
                  className="w-full md:w-[767px] md:h-[546px] overflow-hidden"
                />
              </div>

              <div className="w-full bg-[#FAFAFA] flex items-center p-1 rounded-3xl md:hidden">
                <Image
                  src={Desktopsm}
                  alt="Desktop"
                  className="overflow-hidden h-[201px] w-[343px]"
                />
              </div>
            </figure>
          </div>

          <ul className="flex flex-col gap-6 text-base leading-6 md:hidden pt-8">
            <li className="flex items-center gap-2">
              <span>
                <Image src={Check} height={24} width={24} alt="" />
              </span>
              Automated Alerts
            </li>
            <li className="flex items-center gap-2">
              <span>
                <Image src={Check} height={24} width={24} alt="" />
              </span>
              Comprehensive Reporting
            </li>
            <li className="flex items-center gap-2">
              <span>
                <Image src={Play} height={24} width={24} alt="" />
              </span>
              Streamline Your Inventory Now
            </li>
          </ul>
        </div>

        <div className="mx-auto max-w-[1197px] py-10 px-8">
          <div className="flex flex-col md:flex-row items-center md:gap-4 gap-6 justify-between">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto pb-10">
          <h2 className="text-center py-3 font-medium leading-6 text-green-500">
            How it works
          </h2>

          <div className="flex md:flex-row flex-col-reverse md:gap-[200px] gap-10 items-center px-4">
            <figure className="flex items-center justify-center w-full md:w-auto">
              <Image
                src={Mobile2}
                alt="Mobile view"
                className="max-w-[308px]"
              />
            </figure>
            <div className="flex justify-center w-full md:w-auto max-w-[692px]">
              <div className="flex flex-col items-start gap-16 relative">
                {/* Horizontal connecting line */}
                <div
                  className="absolute md:left-[105px] left-[71px] bg-gray-300"
                  style={{
                    width: "2px",
                    height: "calc(100% - 110px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                ></div>
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col md:flex-row md:gap-[64px] gap-2"
                  >
                    <div className="flex items-start gap-4 md:gap-10">
                      <div className="flex items-center gap-4 md:gap-10">
                        <span className="text-sm md:text-base">Step</span>
                        <div
                          className={`w-12 h-12 md:w-16 md:h-16 flex items-center text-xl md:text-2xl justify-center rounded-full font-medium ${
                            step.isActive
                              ? "bg-black text-white"
                              : "bg-gray-200 text-gray-500"
                          } relative z-10`}
                        >
                          {step.number}
                        </div>
                      </div>

                      {/* Mobile Content */}
                      <div className="md:hidden">
                        <h3
                          className={`text-xl leading-9 font-medium ${
                            step.isActive ? "text-black" : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-gray-500 text-base leading-7 mt-1 ${
                            step.isActive ? "text-black" : "text-gray-400"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Desktop Content */}
                    <div className="hidden md:block md:mt-5">
                      <h3
                        className={`text-2xl leading-9 font-medium ${
                          step.isActive ? "text-black" : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-gray-500 text-lg leading-7 ${
                          step.isActive ? "text-black" : "text-gray-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div></div>
          </div>
        </div>

      </section>
    );
  };

  return <ShopDeskFeatures />;
}
