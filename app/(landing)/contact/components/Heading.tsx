import React from 'react';

const Heading = () => {

  return (
    <div className="text-center px-4 sm:px-6 lg:px-8 py-16">
      <h1 
        className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        We'd <span className="text-green-500">Love</span> to hear from you
      </h1>
      <p 
        className="text-gray-400 py-8 sm:py-10 max-w-md sm:max-w-xl md:max-w-2xl text-base md:text-xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Have questions or need assistance? Reach out to us, and we will be happy to help.
      </p>
    </div>
  );
}

export default Heading;