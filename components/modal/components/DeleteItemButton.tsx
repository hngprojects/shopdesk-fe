"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteItemButton = ({
  itemId,
  className,
  externalFunction,
}: {
  itemId: string | undefined;
  className?: string;
  externalFunction: Function;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await externalFunction(itemId);
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
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
