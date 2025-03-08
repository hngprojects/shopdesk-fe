"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteItemButton = ({ itemId, className }: { itemId: string; className?: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete item");
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      router.refresh(); // Refresh page or update state accordingly
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`flex-1 py-0 max-[640px]:py-6 text-white rounded-md bg-red-500 hover:bg-red-600 ${className}`}
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteItemButton;
