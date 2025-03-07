import Image from "next/image";
import Desktop2 from "@/public/icons/Desktop 2.png";
import Check from "@/public/icons/check.png";
import Play from "@/public/icons/play.png";
import Desktopsm from "@/public/icons/desktopsm.png";
import displayScreen from "@/public/home-images/displayscreen.svg";
import displayScreenSm from "@/public/home-images/displayScreenSm.png";
import displayScreen2 from "@/public/home-images/displayscreen2.svg";
import patreon from "@/public/home-images/patreon.svg";
import airbnb from "@/public/home-images/airbnb.svg";
import fiberplane from "@/public/home-images/fiberplane.svg";
import coinbase from "@/public/home-images/coinbase.svg";
import griffin from "@/public/home-images/griffin.svg";
import helpscout from "@/public/home-images/helpscout.svg";
import plaid from "@/public/home-images/plaid.svg";
import Testimonials from "@/components/functional/testimonials";
import right from "@/public/icons/right.svg";

export default function Home() {
  interface FeatureCardProps {
    iconSrc: string;
    title: string;
    description: string;
    buttonText: string;
    bgColor: string;
  }

  // interface Step {
  //   number: string;
  //   title: string;
  //   description: string;
  //   isActive: boolean;
  // }

  const FeatureCard: React.FC<FeatureCardProps> = ({
    iconSrc,
    title,
    description,
    buttonText,
    bgColor,
  }) => (
    <div
      className={`rounded-[20px] flex flex-1 min-w-[300px] max-w-[400px] flex-col justify-between gap-5 items-start p-4 ${bgColor}`}
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

  // const steps: Step[] = [
  //   {
  //     number: "01",
  //     title: "Easy Account Setup",
  //     description:
  //       "Create your Shopdesk account and easily add your products, pricing, and business details.",
  //     isActive: false,
  //   },
  //   {
  //     number: "02",
  //     title: "Sales and Stock Management",
  //     description:
  //       "Process sales quickly while Shopdesk automatically updates your inventory in real time.",
  //     isActive: true, // Active step
  //   },
  //   {
  //     number: "03",
  //     title: "Track and Analyze Reports",
  //     description:
  //       "Monitor sales, expenses, and stock levels with smart insights and custom reports.",
  //     isActive: false,
  //   },
  //   {
  //     number: "04",
  //     title: "Grow Your Business",
  //     description:
  //       "Make data-driven decisions, prevent stock issues, and boost profits with seamless shop management.",
  //     isActive: false,
  //   },
  // ];

  const ShopDeskFeatures: React.FC = () => {
    const features = [
      {
        iconSrc: "/icons/stock.svg",
        title: "Easy Stock Entry",
        description:
          "Retailers can add and view stock items with unique SKU codes, ensuring accurate tracking. Soft-deleted SKUs cannot be reused, and all added items appear in the stock list.",
        buttonText: "View Stock List",
        bgColor: "bg-blue-50",
      },
      {
        iconSrc: "/icons/note.svg",
        title: "Quick Stock Updates",
        description:
          "Retailers can update stock names, prices, and quantities while keeping SKU codes locked for accuracy. This feature simplifies inventory management, reducing errors and improving stock tracking.",
        buttonText: "Manage Stock",
        bgColor: "bg-rose-50",
      },
      {
        iconSrc: "/icons/delete.svg",
        title: "Smart Stock Control",
        description:
          "Retailers can soft-delete stock items, removing them from the stock list without permanent deletion. Items are marked as “Is deleted” in the database for record-keeping and recovery.",
        buttonText: "Remove Stock",
        bgColor: "bg-yellow-50",
      },
    ];

    return (
      <section>
        <div className=" flex flex-col items-center gap-6 pt-10 max-w-[1000px] mx-auto px-5 min-[600px]:px-10">
          <h1 className="text-[clamp(36px,_6vw,_60px)] max-w-[947px] leading-14 font-circular-bold md:leading-16 text-center">
            <span className="text-[#19A45B]">Simplify</span> Inventory Management – No More Spreadsheets
          </h1>

          <p className="text-gray-600 text-base leading-6  md:text-3xl md:leading-9 font-circular-light text-center font-light min-[400px]:px-5">
          Managing your stock shouldn’t be a hassle. With ShopDesk, you can securely track your inventory effortlessly all in one simple platform.
          </p>

          {/* <button className="btn-primary">Start Your Free Trial</button> */}
        </div>

        <div className="w-full md:mt-[40px] mt-[20px] flex flex-col items-center">
          <Image
            src={displayScreen}
            alt="Display screen"
            className="w-[clamp(320px,_70vw,_850px)] max-w-[850px] hidden md:block"
          />
          <Image
            src={displayScreenSm}
            alt="Display screen"
            className="w-[clamp(320px,_70vw,_850px)] max-w-[850px] md:hidden mb-6"
          />

          <div className="bg-[#19A45B] w-full px-[clamp(18px,_3vw,_80px)] p-6 flex items-center gap-[clamp(16px,_3vw,_48px)] justify-center flex-wrap">
            <Image
              src={patreon}
              alt="Patreon"
              className="w-[clamp(70px,_11vw,_140px)]"
            />
            <Image
              src={airbnb}
              alt="Airbnb"
              className="w-[clamp(70px,_11vw,_140px)]"
            />
            <Image
              src={fiberplane}
              alt="Fiberplane"
              className="w-[clamp(80px,_11vw,_160px)]"
            />
            <Image
              src={coinbase}
              alt="Coinbase"
              className="w-[clamp(75px,_11vw,_150px)]"
            />
            <Image
              src={griffin}
              alt="Griffin"
              className="w-[clamp(60px,_11vw,_120px)]"
            />
            <Image
              src={helpscout}
              alt="Helpscout"
              className="w-[clamp(80px,_11vw,_160px)]"
            />
            <Image
              src={plaid}
              alt="Plaid"
              className="w-[clamp(60px,_11vw,_120px)]"
            />
          </div>
        </div>

        <div className="mx-auto max-w-[1198px] px-5 min-[600px]:px-10">
          <h2 className="text-center py-4 md:py-3 font-medium leading-6 text-[#009A49]">
            Key Features
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-8 min-w-[300px]">
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
                <li className="flex items-center gap-2 text-base">
                  <span>
                    <Image src={Check} height={24} width={24} alt="" />
                  </span>
                  Real-Time Stock Tracking
                </li>
                <li className="flex items-center gap-2 text-base">
                  <span>
                    <Image src={Check} height={24} width={24} alt="" />
                  </span>
                  Effortless Organization
                </li>
                <li className="flex items-center gap-2 text-base">
                  <span>
                    <Image src={Play} height={24} width={24} alt="" />
                  </span>
                  Streamline Your Inventory Now
                </li>
              </ul>
            </div>

            <div className="w-full max-w-[622px] bg-[#FAFAFA] p-2 pt-5 pr-0 hidden md:block">
              <Image
                src={Desktop2}
                alt="Desktop"
                className="flex-1 overflow-hidden"
              />
            </div>

            <div className="w-full max-w-[450px] mt-4 flex flex-col items-center p-1 rounded-3xl md:hidden">
              <div className="bg-[#FAFAFA] pt-1.5 px-1.5 pb-0 rounded-tl-3xl rounded-tr-3xl w-full">
                <Image
                  src={Desktopsm}
                  alt="Desktop"
                  className="overflow-hidden h-[201px]"
                />
              </div>

              <ul className="flex flex-col gap-6 text-base leading-6 md:hidden pt-8 self-start">
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
          </div>
        </div>

        <div className="mx-auto max-w-[1198px] py-10 px-8">
          {/* <div className="flex flex-col md:flex-row items-center md:items-stretch md:gap-4 gap-6 justify-between"> */}
          <div className="flex items-stretch justify-center gap-4 flex-wrap">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
          
        </div>

        <Testimonials />
      </section>
    );
  };

  return <ShopDeskFeatures />;
}
