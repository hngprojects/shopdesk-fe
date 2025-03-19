"use client"
import Link from "next/link";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { FC } from "react";

const NotFoundPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-no-repeat bg-right bg-contain md:bg-[url(/auth/bg-pattern.svg)] min-h-screen bg-white text-center p-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-green-100">
        <div className="rounded-full bg-green-100 p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <AlertTriangle className="text-green-600 w-10 h-10" />
        </div>
        
        <h1 className="text-4xl font-bold text-green-800">404</h1>
        <h2 className="text-2xl font-semibold text-green-700 mt-2">Page Not Found</h2>
        
        <p className="text-gray-600 mt-4">
          Oops! The page you are looking for doesn't seem to exist.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
              <Home size={18} />
              <span>Go Home</span>
            </button>
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="w-full sm:w-auto px-6 py-3 bg-white text-green-700 border border-green-600 rounded-lg hover:bg-green-50 transition flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
      
     
    </div>
  );
};

export default NotFoundPage;