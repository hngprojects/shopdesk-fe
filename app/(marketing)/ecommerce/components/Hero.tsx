<<<<<<< HEAD
import Image from 'next/image'
import React from 'react'
import logo from "@/public/icons/logo.svg";
import play from "@/public/coming-soon/Icon.svg";
import Log from "@/public/smart-business/_Logo Wrapper.svg";


const Hero = () => {

    const sharedClass: string = "flex flex-col items-center";
  
    return (
        <>
            <section
                className={`${sharedClass} gap-16 w-full md:mb-[61px] md:mt-[80px]`}
            >
                <div
                className={`${sharedClass} gap-8 md:w-8/10 w-full max-w-[876px] relative`}
                >
                <h2 className="text-center p-5 backdrop-blur-[200px] text-[#009A49] rounded-[500px] text-[40px] md:text-[60px] leading-[100%] font-[700]">
                    E-commerce Entrepreneurs {" "}
                    <span className='text-[#171717] text-[24px] md:text-[40px] block mt-2'>Take Control of Your Stock – Manage Inventory in One Click
                    </span>
                </h2>
                <p className="text-center font-[300] text-[18px] md:text-[24px] leading-[100%] text-[#5F5F5F]">
                Managing inventory and tracking stock records doesn’t have to be difficult. Shopdesk gives e-commerce entrepreneurs a simple yet powerful inventory management tool to track, update, and organize stock records with ease.
                </p>
                </div>
            </section>
<<<<<<< HEAD:app/ecommerce/components/Hero.tsx
            {/* <section className="px-6 md:px-12 flex justify-center flex-col items-center lg:px-16 py-8 md:py-12"> */}
      {/* <motion.div
        className="relative w-full max-w-4xl border-[24px] border-[#00000080] rounded-lg overflow-hidden shadow-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={zoomIn}
      >
        <motion.div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRight}
        > */}
=======
         
>>>>>>> upstream/dev:app/(marketing)/ecommerce/components/Hero.tsx
            <section className="px-6 md:px-12 flex justify-center flex-col items-center lg:px-16 py-8 md:py-12">

          <div
        className="relative w-full max-w-4xl border-[24px] border-[#00000080] rounded-lg overflow-hidden shadow-lg"
          
          >
            
              <div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10"
              
              >
                  <Image
                      src={Log}
                      alt="Person holding a crate of oranges"
                      width={100}
                      height={100}
                      className="w-full h-full"
                    />
              </div>
<<<<<<< HEAD:app/ecommerce/components/Hero.tsx
                      {/* </motion.div> */}
=======
>>>>>>> upstream/dev:app/(marketing)/ecommerce/components/Hero.tsx
              
                   
                      <div className="relative w-full h-[500px]">
                <iframe
                  className="w-full h-full"
                  src="https://drive.google.com/file/d/1Bm5n9alHx8mspihxdtHEPHj2PtmYirUq/preview"
                  allow="autoplay"
                ></iframe>
                <div className="absolute inset-0 bg-black/30 bg-opacity-50 pointer-events-none"></div>
              </div>
          </div>
</section>
      {/* </motion.div>         */}
        </>

  )
}

export default Hero
=======
import Image from 'next/image';
import React from 'react';
import logo from '@/public/icons/logo.svg';
import play from '@/public/coming-soon/Icon.svg';
import Log from '@/public/smart-business/_Logo Wrapper.svg';

const Hero = () => {
  const sharedClass: string = 'flex flex-col items-center';

  return (
    <>
      <section
        className={`${sharedClass} gap-16 w-full md:mb-[61px] md:mt-[80px]`}
      >
        <div
          className={`${sharedClass} gap-8 md:w-8/10 w-full max-w-[876px] relative`}
        >
          <h2 className='text-center p-5 backdrop-blur-[200px] text-[#009A49] rounded-[500px] text-[40px] md:text-[60px] leading-[100%] font-[700]'>
            E-commerce Entrepreneurs{' '}
            <span className='text-[#171717] text-[24px] md:text-[40px] block mt-2'>
              Take Control of Your Stock – Manage Inventory in One Click
            </span>
          </h2>
          <p className='text-center font-[300] text-[18px] md:text-[24px] leading-[100%] text-[#5F5F5F]'>
            Managing inventory and tracking stock records doesn’t have to be
            difficult. Shopdesk gives e-commerce entrepreneurs a simple yet
            powerful inventory management tool to track, update, and organize
            stock records with ease.
          </p>
        </div>
      </section>

      <section className='px-6 md:px-12 flex justify-center flex-col items-center lg:px-16 py-8 md:py-12'>
        <div className='relative w-full max-w-4xl border-[24px] border-[#00000080] rounded-lg overflow-hidden shadow-lg'>
          <div className='absolute top-4 left-1/2 transform -translate-x-1/2 z-10'>
            <Image
              src={Log}
              alt='Person holding a crate of oranges'
              width={100}
              height={100}
              className='w-full h-full'
            />
          </div>

          <div className='relative w-full h-[500px]'>
            <iframe
              className='w-full h-full'
              src='https://drive.google.com/file/d/1Bm5n9alHx8mspihxdtHEPHj2PtmYirUq/preview'
              allow='autoplay'
            ></iframe>
            <div className='absolute inset-0 bg-black/30 bg-opacity-50 pointer-events-none'></div>
          </div>
        </div>
      </section>
      {/* </motion.div>         */}
    </>
  );
};

export default Hero;
>>>>>>> upstream/dev
