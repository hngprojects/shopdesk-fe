"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

    // Check if fields are empty
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

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-dvh w-full bg-white md:bg-[url(/auth/bg-pattern.svg)] bg-contain bg-no-repeat bg-right px-8 md:px-16">
      <div className="border-b border-[#F2F4F7] flex lg:hidden justify-center h-20">
        <Logo />
      </div>

      <main className="size-full flex justify-center lg:justify-between items-center">
        {/* left */}
        <div className="hidden lg:flex flex-col gap-8 justify-center items-center max-w-[278px]">
          <div>
            <div className="flex flex-col gap-2">
              <Image src={Cube} alt="cube" width={56} height={56} />
              <h1 className="md:text-4xl lg:text-5xl font-bold">ShopDesk</h1>
            </div>

            <p className="text-[#1B1B1B] mt-2 text-2xl font-bold">
              Run your Business with{" "}
              <span className="text-[#009A49] font-semibold">Ease</span>
            </p>
          </div>

          <Image
            src={Illustration}
            alt="Illustration"
            width={278}
            height={321}
            quality={90}
            priority
          />
        </div>

        {/* right */}
        <div className="max-w-[588px] w-full">
          <div className="w-full max-h-[658px] bg-gradient-to-r from-[#FFFFFF66] to-[#FFFFFF00] p-8 py-20 rounded-[40px] shadow-sm backdrop-blur-md">
            <h2 className="text-4xl md:text-5xl font-semibold text-center mb-6">
              Sign in
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address <span className="text-[#FF1925]">*</span>
                </label>
                <input
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
                />
                {touched.email && !email && (
                  <p className="text-red-500 text-sm">Email is required.</p>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="block text-sm font-medium">
                  Your password <span className="text-[#FF1925]">*</span>
                </label>
                <input
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
                />
                {touched.password && !password && (
                  <p className="text-red-500 text-sm">Password is required.</p>
                )}
              </div>

              {/* Error Message */}
              {error && <p className="text-red-600 text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#2A2A2A] text-white p-3 rounded-lg font-medium hover:bg-black transition duration-200 flex justify-center items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}
