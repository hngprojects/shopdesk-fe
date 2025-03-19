"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";

interface LogoutConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  organizationName?: string;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  open,
  onOpenChange,
  onCancel,
  organizationName,
}) => {
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        alert("No refresh token found. Please log in again.");
        return;
      }

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      // Clear tokens
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");

      // Redirect to the homepage
      window.location.href = "/"; // Redirect to the homepage
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden border border-gray-200 space-y-4">
        <div className="relative">
          <div className="pt-8 pb-4 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-[#FEF6F6] flex items-center justify-center mb-4">
              <LogOut className="h-8 w-8 text-[#414141]" />
            </div>

            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-semibold font-circular-bold">
                Log out of Shopdesk
              </DialogTitle>
            </DialogHeader>

            <div className="text-center px-8 text-[#717171] font-circular-light mt-2">
              Are you sure you want to log out of Shopdesk as{" "}
              <span>{organizationName}</span>? You can always log in when you want to.
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          <DialogFooter className="flex flex-row p-4 gap-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 py-6 rounded-md border-[#1B1B1B] text-[#1B1B1B]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              className="flex-2 py-6 rounded-md bg-[#414141] hover:bg-red-600 text-white"
            >
              Log out
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutConfirmModal;