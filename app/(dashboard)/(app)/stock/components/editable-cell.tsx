"use client";

import { editStock } from "@/actions/stocks";
import { Input } from "@/components/ui/input";
// import { useEditStockMutation } from "@/redux/features/stock/stock.api";
import { useEffect, useRef, useState, useTransition } from "react";

type EditableCellProps = {
  value: string;
  currency?: string;
  onChange: (newValue: string) => void;
  stockId: string;
  accessorKey: string;
};

export function EditableCell({
  value,
  currency,
  onChange,
  stockId,
  accessorKey,
}: EditableCellProps) {
  const [editing, setEditing] = useState(false);
  const [internalValue, setInternalValue] = useState<string>(value);
  const inputRef = useRef<HTMLInputElement>(null);
  // const [editStock] = useEditStockMutation();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const handleSave = async () => {
    setEditing(false);
    if (internalValue !== value) {
      startTransition(async () => {
        try {
          const response = await editStock({
            id: stockId,
            [accessorKey]: internalValue,
          });

          if (response.error) {
            console.error("Error updating stock:", response.error);
          } else {
            console.log("Stock updated successfully", response);
          }
        } catch (error) {
          console.error("Error updating stock:", error);
        }
      });
    }
  };

  return editing ? (
    <Input
      ref={inputRef}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSave();
        }
        if (e.key === "Escape") {
          setInternalValue(value);
          setEditing(false);
        }
      }}
      className="border-none p-5  rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative"
    />
  ) : (
    <Input
      ref={inputRef}
      value={
        currency
          ? `${currency ?? ""} ${internalValue?.toLocaleString() ?? ""}`
          : `${internalValue?.toLocaleString() ?? ""}`
      }
      onClick={() => setEditing(true)}
      onKeyDown={() => setEditing(true)}
      readOnly
      className="border-none p-5  rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative"
    />
  );
}
