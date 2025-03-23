import Logo from "@/components/functional/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import instagram from "@/public/icons/instagram.svg"
import facebook from "@/public/icons/facebook.svg"
import twitter from "@/public/icons/twitter.svg"
import mans from "@/public/smart-business/Group 362.png"

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen max">
      {/* Header */}
      <header className="flex items-center justify-between max-[768px]:justify-center py-4">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex space-x-4 max-[768px]:hidden">
          <a href="https://x.com/shopdesk_?s=21" target="_blank" className="size-[50px] border border-[#D0D0D0] rounded-full flex items-center justify-center cursor-pointer">
          <Image 
              src={twitter}
              alt="instagram logo"
              className="size-6"
            />
          </a>
          <a href="https://www.facebook.com/share/18weYAqtPe/" target="_blank" className="size-[50px] border border-[#D0D0D0] rounded-full flex items-center justify-center cursor-pointer">
          <Image 
              src={facebook}
              alt="instagram logo"
              className="size-6"
            />
          </a>
          <a href="https://www.instagram.com/shopdesk_?igsh=MXIybG5sNXhvazI5dg==" target="_blank" className="size-[50px] border border-[#D0D0D0] rounded-full flex items-center justify-center cursor-pointer">
            <Image 
              src={instagram}
              alt="instagram logo"
              className="size-6"
            />
          </a>
        </div>
      </header>

      <section className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col max-[768px]:items-center max-w-[587px] flex-1 max-[1000px]:scale-90 max-[900px]:scale-85 max-[800px]:scale-75 max-[768px]:text-center">
          <p className="font-circular-bold text-[96px] text-[#19A45B] ">
            ShopDesk
          </p>

          <p className="font-circular-bold text-[40px]">
            Your Smart Business Sidekick!
          </p>

          <p className="font-circular-light text-[24px] text-[#5F5F5F] mt-6 ">
            Shopdesk helps small business owners like yours manage inventory, track sales and profits without the headache.
          </p>
        </div>

        <div className="max-[768px]:max-w-[400px]">
          <Image 
            src={mans}
            alt="mans holding fruits"
          />
        </div>

      </section>

      <section className=" px-4 py-8 md:py-12">
        <div className="relative mt-16 mb-8 h-3 bg-[#19A45B] w-full">  
          <a href="/sign-up" className="absolute bg-[#19A45B] p-4 px-6 rounded-full text-white text-[20px] top-1/2 -translate-y-1/2 max-[768px]:left-1/2 max-[768px]:-translate-x-1/2">
            Try Shopdesk now
          </a>        
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-12 px-4">
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Trial Section */}
          <div className="p-4">
            
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 border border-gray-300 rounded"
              />
              <div className="relative">
                <select disabled
                  className="w-full p-3 border border-gray-300 rounded appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>Business Type</option>
                  <option>Retail</option>
                  <option>Wholesale</option>
                  <option>Manufacturing</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ChevronDown size={20} />
                </div>
              </div>
              <input
                type="text"
                placeholder="Business Name (Optional)"
                className="w-full p-3 border border-gray-300 rounded"
              />
              <Button className="w-full p-6 bg-[#B8B8B8] hover:bg-black text-white rounded">
                <span>Join Waitlist</span>
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </form>
          </div>
          
          {/* Features Section */}
          <div className="grid gap-6">

            <p className="text-[40px] font-circular-medium">
              What we <span> </span> <span className="text-[#19A45B]">offer?</span>
            </p>
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"></path></svg>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Automated Inventory Management</h4>
                <p className="text-gray-600 text-sm">
                Confirm your stock level at a glance
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Easy Sales & Discount Management</h4>
                <p className="text-gray-600 text-sm">
                Apply discounts seamlessly and track every sale without
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-orange-400 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg">User-Friendly & Fast</h4>
                <p className="text-gray-600 text-sm">
                Designed for small and medium business owners—no tech skills required
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-orange-400 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Secure, Role-Based Access</h4>
                <p className="text-gray-600 text-sm">
                Designed for small and medium business owners—no tech skills required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full mx-4 bg-[#E5F5ED] flex flex-col justify-center items-center p-8 gap-6">
        <p className="text-[#19A45B]">
        Reviews from Beta Users
        </p>

        <p className="font-circular-light text-[24px]">
        As someone who isn’t tech-savvy, I was worried about switching systems. But ShopDesk is incredibly user-friendly, and the onboarding was a breeze!
        </p>

        <p className=" text-[24px]">
        — Mark M, Small Business Owner
        </p>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © Copyright 2025, Powered by Timbu Business
          </p>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 text-sm hover:text-gray-800">Cookies</Link>
            <Link href="#" className="text-gray-500 text-sm hover:text-gray-800">Terms of Service</Link>
            <Link href="#" className="text-gray-500 text-sm hover:text-gray-800">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 text-sm hover:text-gray-800">Manage privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;