"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    const refreshToken = sessionStorage.getItem("refresh_token");

    if (!refreshToken) {
      clearSession();
      router.push("/sign-in");
      return;
    }

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearSession();
      router.push("/sign-in");
      setLoading(false);
    }
  };

  const clearSession = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user");
  };

  return (
    <button
      onClick={handleLogout}
       className="flex-1 py-6 lg:py-0  rounded-md bg-red-500 hover:bg-red-600"
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
