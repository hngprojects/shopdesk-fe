import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Logo from '@/public/smart-business/logo.svg';
import play from '@/public/smart-business/play.svg'

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const iframeRef = useRef(null);

  const togglePlay = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Toggle play/pause state
    setIsPlaying(!isPlaying);
    setShowOverlay(!showOverlay);
  };

  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-8 md:py-12 lg:py-16 flex flex-col items-center">
      {/* Video Container */}
      <div 
        className="relative w-full max-w-7xl border-2 sm:border-4 md:border-6 lg:border-10 border-gray-400 rounded-4xl overflow-hidden shadow-lg"
        data-aos="zoom-in"
        data-aos-once="true"
      >
        {/* Logo */}
        <div 
          className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-10 w-10 sm:w-16 md:w-24"
          data-aos="fade-right"
          data-aos-once="true"
          data-aos-delay="300"
        >
          <Image
            src={Logo}
            alt="Company logo"
            width={120}
            height={120}
            className="w-full h-auto"
          />
        </div>

        {/* Video Iframe with Play Button Overlay */}
        <div className="relative w-full aspect-[16/9] h-auto min-h-20 sm:min-h-12">
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-0 w-full h-full"
            src="https://drive.google.com/file/d/18nzV42E0r84vpeq9OxnZXsdmcrLhl16r/preview"
            allow="autoplay"
            allowFullScreen
          />
          
          {/* Play Button Overlay */}
          {showOverlay && (
            <div 
              className="absolute inset-0 bg-black/70 flex items-center justify-center cursor-pointer transition-opacity duration-300"
              onClick={togglePlay}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Image
                    src={play}
                    alt='video play button'
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Text below video */}
      <div className="w-full max-w-6xl text-center mt-10">
        <h2 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="500"
        >
          Your Smart Business Sidekick!
        </h2>
      </div>
    </section>
  );
};

export default VideoSection;