"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Cube from "@/public/auth/cube.svg";

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={Cube}
          alt="Loading..."
          width={100}
          height={100}
          className="w-20 h-20"
        />
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
