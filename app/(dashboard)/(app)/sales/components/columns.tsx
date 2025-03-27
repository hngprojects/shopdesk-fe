"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { EditableCell } from "./editable-cell";

export type Sale = {
  id: string;
  date: string;
  time: string;
  itemName: string;
  quantitySold: number;
  sellPrice: number;
  profit: number;
  isSpacer?: boolean;
};

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "itemName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ITEM NAME" />
    ),
    cell: ({ row }) => {
      const isTotal = row.original.itemName === "Total";

      if (row.original.isSpacer) {
        return <div className="h-4" />;
      }

      if (isTotal) {
        return (
          <div className="flex justify-between items-center relative h-11">
            <div className="text-sm text-gray-600 px-5 h-full border-t-0 border-l-0 rounded-tr-[0.625rem] rounded-tl-[0.625rem] border-[#DEE5ED] w-3/4 text-center flex justify-center items-center border-solid border-b-0 border">
              {row.original.date} <span className="text-[#DEE5ED] mx-3">|</span>{" "}
              {row.original.time}
            </div>
            <div className="font-semibold px-5">Total</div>
          </div>
        );
      }

      return (
        <p className="border-none p-5 rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:z-10 relative">
          {row.original.itemName}
        </p>
      );
    },
  },
  {
    accessorKey: "quantitySold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="QUANTITY SOLD" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-full h-11">
          <p className="border-none p-5 rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative">
            {row.original.quantitySold}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "sellPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SELL. PRICE" />
    ),
    cell: ({ row }) => (
      <div className="w-full h-11">
        <EditableCell
          value={row.getValue("sellPrice")}
          currency="NGN"
          onChange={() => {}}
        />
      </div>
    ),
  },
  {
    accessorKey: "profit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SHOW PROFIT" />
    ),
    cell: ({ row }) => (
      <div className="w-full text-right h-11">
        {row.getValue("profit") ? (
          <EditableCell
            value={row.getValue("profit")}
            currency="₦"
            onChange={() => {}}
          />
        ) : (
          ""
        )}
      </div>
    ),
    size: 250,
  },
];
