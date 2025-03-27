import { Button } from '@/components/ui/button'
import React from 'react'

const Hero = () => {
  return (
    <section 
      className="max-w-4xl mx-auto text-center px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20 space-y-6 sm:space-y-8"
      data-aos="fade-in" // Added container animation
    >
      <h1 
        className="text-4xl sm:text-5xl md:text-6xl text-[#009A49] font-semibold leading-tight"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        Features
      </h1>
      <p 
        className="text-lg sm:text-xl md:text-2xl text-gray-500 leading-snug sm:leading-normal text-light"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-anchor-placement="top-bottom" // Ensures proper triggering
      >
        Shopdesk helps you track inventory, record sales, and generate reports
        <span 
          className="block mt-2 sm:mt-0"
          data-aos="fade-up"
          data-aos-delay="250" // Slight delay for the second line
        >
          effortlessly, saving you time, reducing errors, and boosting efficiency.
        </span>
      </p>
      <Button 
        variant='default' 
        className="px-6 py-6 text-base sm:text-lg rounded-lg"
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-anchor-placement="top-bottom"
      >
        Get Started
      </Button>
    </section>
  )
}

export default Hero