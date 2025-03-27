import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

const StockManagementSection = () => {
  return (
    <section className="py-8 lg:py-16 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 xl:gap-12 w-full mx-auto">
      {/* Left Content Section - Fixed width */}
      <div 
        className="p-6 sm:p-8 lg:w-[500px] flex-shrink-0 space-y-5"
        data-aos="fade-right"
      >
        {/* Icon */}
        <div data-aos="fade-up" data-aos-delay="100">
          <img 
            src="/features-images/featuredIcon.svg" 
            alt="features icon" 
            className="w-12 h-12"
          />
        </div>

        {/* Heading and Description */}
        <div data-aos="fade-up" data-aos-delay="150">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
            Smart Stock Management
          </h1>
          <p className="text-base sm:text-lg text-gray-500 mb-6">
            Track stock levels and receive low-stock alerts.
          </p>
        </div>

        {/* Checklist */}
        <div 
          className="text-left mb-6"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          <ul className="space-y-4 sm:space-y-6">
            {[
              "Stay updated with live inventory levels and never run out of essential products.",
              "Keep your stock organized and in control with an intuitive and reliable system.",
              "Effortlessly track, update, and monitor your products, all in real time."
            ].map((item, index) => (
              <li 
                key={index} 
                className="flex items-start gap-3"
                data-aos="fade-up"
                data-aos-delay={250 + (index * 50)}
              >
                <img 
                  src="/features-images/checkIcon.svg" 
                  alt="checked icon" 
                  className="mt-1 flex-shrink-0 w-5 h-5"
                />
                <p className="text-gray-500 text-base sm:text-lg">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div data-aos="fade-up" data-aos-delay="400">
          <a 
            href="/sign-up" 
            className="text-gray-900 text-base font-semibold hover:underline inline-flex items-center transition-all duration-300 hover:text-green-600"
          >
            Organize Your Inventory Now
            <img 
              src="/features-images/arrow-right.svg" 
              alt="arrow right" 
              className="ml-3 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* Right Image Section - Fluid width */}
      <div 
        className="relative flex-1 min-w-0" 
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <div className="h-full flex items-center justify-center">
          <Image
            src="/features-images/stock-management.svg"
            alt="Stock management data table"
            width={700}
            height={400}
            className="w-full h-auto max-w-full border border-gray-200 rounded-lg shadow-md object-contain"
            priority
            style={{
              maxWidth: '90%',
              height: 'auto'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default StockManagementSection;