"use client"

import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoSection from './components/VideoSection'
import ProblemSolutionSection from './components/MeetShopdesk'
import LeadCaptureForm from './components/LeadCaptureForm'
import Aos from 'aos';
import 'aos/dist/aos.css';
import Footer from './components/Footer'


const  SmartBusiness = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className='max-w-[1440px] mx-auto'>
      <Navbar />
      <Hero />
      <VideoSection />
      <ProblemSolutionSection />
      <LeadCaptureForm />
      <Footer />
    </div>
  )
}

export default  SmartBusiness