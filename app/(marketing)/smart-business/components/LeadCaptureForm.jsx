import React from 'react';

const LeadCaptureForm = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-2xl">
        {/* Form Header */}
        <div 
          className="text-center mb-8 space-y-6"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#19A45B] bg-[#E5F5ED] rounded-full px-4 py-6 md:py-8">
            Lead Capture Form
          </h1>
          <p className="text-lg md:text-xl text-gray-800">
            Get Instant Access to Your Free Trial! (Fill out the form to get started)
          </p>
        </div>

        {/* Form Container */}
        <div 
          className="p-6 sm:p-8 md:p-10"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="100"
        >
          <form className="space-y-6">
            {/* Full Name */}
            <div data-aos="fade-up" data-aos-once="true" data-aos-delay="200">
              <input
                type="text"
                id="fullName"
                className="w-full px-4 py-4 md:py-5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#19A45B] focus:border-[#19A45B] outline-none transition placeholder-gray-400"
                placeholder="Full Name"
                required
              />
            </div>

            {/* Email Address */}
            <div data-aos="fade-up" data-aos-once="true" data-aos-delay="250">
              <input
                type="email"
                id="email"
                className="w-full px-4 py-4 md:py-5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#19A45B] focus:border-[#19A45B] outline-none transition placeholder-gray-400"
                placeholder="Email address"
                required
              />
            </div>

            {/* Business Type - Improved Select */}
            <div data-aos="fade-up" data-aos-once="true" data-aos-delay="300" className="relative">
              <select
                id="businessType"
                className="w-full px-4 py-4 md:py-5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#19A45B] focus:border-[#19A45B] outline-none transition appearance-none text-gray-400 pr-10"
                required
              >
                <option value="" className="text-gray-400">Business type</option>
                <option value="retail" className="text-gray-900">Retail</option>
                <option value="ecommerce" className="text-gray-900">E-commerce</option>
                <option value="service" className="text-gray-900">Service</option>
                <option value="restaurant" className="text-gray-900">Restaurant</option>
                <option value="other" className="text-gray-900">Other</option>
              </select>
              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Business Name (Optional) */}
            <div data-aos="fade-up" data-aos-once="true" data-aos-delay="350">
              <input
                type="text"
                id="businessName"
                className="w-full px-4 py-4 md:py-5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#19A45B] focus:border-[#19A45B] outline-none transition placeholder-gray-400"
                placeholder="Business Name (Optional)"
              />
            </div>

            {/* Submit Button */}
            <div data-aos="fade-up" data-aos-once="true" data-aos-delay="400">
              <button
                type="submit"
                className="w-full py-4 md:py-5 px-6 bg-gray-300 text-bg-gray-800 font-medium rounded-lg hover:bg-[#148C4D] hover:cursor-pointer transition-colors text-lg"
              >
                Join Waitlist
                <img src="/smart-business/arrow.svg" alt="right arrow" className='inline-flex ml-2' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;