"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import Illustration from "@/public/auth/illustration.svg";
import Cube from "@/public/auth/cube.svg";
import { AuthFooter } from "./footer";
import Logo from "@/components/functional/logo";
import { loginUser } from "@/services/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log({ email, password });

    setTouched({ email: true, password: true });

  
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(email, password);
      console.log({ email, password });

      if (!data || data.error) {
        throw new Error(data?.message || "Invalid email or password.");
      }
      sessionStorage.setItem("access_token", data.access_token);
    sessionStorage.setItem("refresh_token", data.refresh_token);

    
    router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, delay: 0.2 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, delay: 0.3 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col h-dvh w-full bg-white md:bg-[url(/auth/bg-pattern.svg)] bg-contain bg-no-repeat bg-right px-8 md:px-16">
      <motion.div 
        className="border-b border-[#F2F4F7] flex lg:hidden justify-center h-20"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Logo />
      </motion.div>

      <main className="size-full flex justify-center lg:justify-between items-center">
        {/* left */}
        <motion.div 
          className="hidden lg:flex flex-col gap-8 justify-center items-center max-w-[278px]"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="flex flex-col gap-2">
              <motion.div
                variants={logoVariants}
                whileHover={{ rotate: 10 }}
              >
                <Image src={Cube} alt="cube" width={56} height={56} />
              </motion.div>
              <motion.h1 
                className="md:text-4xl lg:text-5xl font-bold"
                variants={itemVariants}
              >
                ShopDesk
              </motion.h1>
            </div>

            <motion.p 
              className="text-[#1B1B1B] mt-2 text-2xl font-bold"
              variants={itemVariants}
            >
              Run your Business with{" "}
              <motion.span
                className="text-[#009A49] font-semibold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Ease
              </motion.span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Image
              src={Illustration}
              alt="Illustration"
              width={278}
              height={321}
              quality={90}
              priority
            />
          </motion.div>
        </motion.div>

        {/* right */}
        <motion.div 
          className="max-w-[588px] w-full"
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <motion.div 
            className="w-full max-h-[658px] bg-gradient-to-r from-[#FFFFFF66] to-[#FFFFFF00] p-8 py-20 rounded-[40px] shadow-sm backdrop-blur-md"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ 
              opacity: 1, 
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)" 
            }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-semibold text-center mb-6"
              variants={itemVariants}
            >
              Sign in
            </motion.h2>

            <motion.form 
              onSubmit={handleSubmit} 
              className="flex flex-col gap-6"
              variants={containerVariants}
            >
              <motion.div 
                className="flex flex-col gap-1.5"
                variants={itemVariants}
              >
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address <span className="text-[#FF1925]">*</span>
                </label>
                <motion.input
                  type="email"
                  id="email"
                  className={`w-full p-3 border rounded-[9px] outline-none text-[#2A2A2A]
                    ${
                      touched.email && !email
                        ? "border-red-500"
                        : "border-gray-300"
                    }
                    ${
                      email ? "focus:border-[#009A49] focus:ring-[#CCEBDB]" : ""
                    }`}
                  placeholder="johnwick@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, email: true }))
                  }
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
                {touched.email && !email && (
                  <motion.p 
                    className="text-red-500 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Email is required.
                  </motion.p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div 
                className="flex flex-col gap-1.5"
                variants={itemVariants}
              >
                <label htmlFor="password" className="block text-sm font-medium">
                  Your password <span className="text-[#FF1925]">*</span>
                </label>
                <motion.input
                  type="password"
                  id="password"
                  className={`w-full p-3 border rounded-[9px] outline-none text-[#2A2A2A]
                    ${
                      touched.password && !password
                        ? "border-red-500"
                        : "border-gray-300"
                    }
                    ${
                      password
                        ? "focus:border-[#009A49] focus:ring-[#CCEBDB]"
                        : ""
                    }`}
                  placeholder="*************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, password: true }))
                  }
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
                {touched.password && !password && (
                  <motion.p 
                    className="text-red-500 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Password is required.
                  </motion.p>
                )}
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.p 
                  className="text-red-600 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                className="w-full bg-[#2A2A2A] text-white p-3 rounded-lg font-medium hover:bg-black transition duration-200 flex justify-center items-center gap-2"
                disabled={loading}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {loading ? (
                  <motion.span 
                    className="size-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  ></motion.span>
                ) : (
                  "Sign in"
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </main>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <AuthFooter />
      </motion.div>
    </div>
  );
}