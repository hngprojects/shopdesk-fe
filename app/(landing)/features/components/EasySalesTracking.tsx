import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

const EasySalesTracking = () => {
  return (
    <section className="py-8 lg:py-16 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 xl:gap-12 w-full mx-auto">
      
       {/* Right Image Section - Fluid width */}
       <div 
        className="relative flex-1 min-w-0" // Allows the image to shrink
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <div className="h-full flex items-center justify-center">
          <Image
            src="/features-images/easysales.svg"
            alt="Sales management data table"
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
      
      {/* Right Content Section - Fixed width */}
      <div 
        className="p-6 sm:p-8 lg:w-[500px] flex-shrink-0 space-y-5"
        data-aos="fade-right"
      >
        {/* Icon */}
        <div data-aos="fade-up" data-aos-delay="100">
          <img 
            src="/features-images/salesIcon.svg" 
            alt="features icon" 
            className="w-12 h-12"
          />
        </div>

        {/* Heading and Description */}
        <div data-aos="fade-up" data-aos-delay="150">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
            Easy Sales Tracking
          </h1>
          <p className="text-base sm:text-lg text-gray-500 mb-6">
            Process transactions and automatically generate receipts.
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
              "Process sales quickly with support for cash, card, and online payments.",
              "Automatically update stock levels with every transaction to keep records accurate.",
              "Ensure a smooth and efficient payment process for both you and your customers."
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
            Get Access To Sales Insights
            <img 
              src="/features-images/arrow-right.svg" 
              alt="arrow right" 
              className="ml-3 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default EasySalesTracking;