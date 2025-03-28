"use client";

import { Icons } from "@/components/ui/icons";
import { useGetWeeklySalesQuery } from "@/redux/features/stock/stock.api";
import {
  toggleProfitExpand,
  toggleSalesExpand,
} from "@/redux/features/table/toggle.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useStore } from "@/store/useStore";
import { getDateStartRange } from "@/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import type { Stock } from "./data/schema";
import { EditableCell } from "./editable-cell";
import { ProfitColumnHeader } from "./profit-column/profit-column-header";
import { SalesColumnHeader } from "./sales-column/sales-column-header";

export const columns: ColumnDef<Stock>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <div className='h-full p-2 w-full flex items-center justify-center'>
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && 'indeterminate')
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label='Select all'
  //         className='trans '
  //       />
  //     </div>
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //       className='absolute left-1/2 -translate-x-1/2 bottom-1/3 -translate-y-1/2'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ITEM NAME" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>("name");
      return (
        <EditableCell
          value={value}
          accessorKey="name"
          stockId={row.original.id}
          onChange={(val) => {
            row.original.name = val;
            // Optional: sync this update to local state or backend
          }}
        />
      );
    },
  },
  {
    accessorKey: "buying_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SELL PRICE" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>("buying_price");

      return (
        <EditableCell
          value={value}
          accessorKey="buying_price"
          currency={row.original.currency_code}
          stockId={row.original.id}
          onChange={(val) => {
            row.original.buying_price = Number(val);
          }}
        />
      );
    },
    size: 100,
  },
  {
    accessorKey: "available",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AVAILABLE" />
    ),
    cell: ({ row }) => {
      const value = row.original.quantity;

      // console.log(value, "value");

      return (
        <EditableCell
          value={String(value) || "0"}
          accessorKey="quantity"
          stockId={row.original.id}
          onChange={(val) => {
            row.original.quantity = Number(val);
          }}
        />
      );
    },
    size: 100,
  },
  {
    accessorKey: "sales",
    header: ({ table }) => {
      const dispatch: AppDispatch = useDispatch();
      const isSalesExpanded = useSelector(
        (state: RootState) => state.toggleTableState.isSalesExpanded
      );
      return (
        <SalesColumnHeader
          table={table}
          isExpanded={isSalesExpanded}
          toggleExpand={() => dispatch(toggleSalesExpand())}
        />
      );
    },
    cell: ({ row, table }) => {
      const isExpanded = useSelector(
        (state: RootState) => state.toggleTableState.isSalesExpanded
      );

      const { organizationId } = useStore();
      const dateRangeStart = getDateStartRange();
      const { data: salesData, isLoading } = useGetWeeklySalesQuery({
        organization_id: organizationId,
        product_ids: [row.original.id],
        date_range_start: dateRangeStart,
      });

      if (isLoading) {
        return (
          <div className="flex items-center justify-center">
            <Icons.LoadingIcon />
          </div>
        );
      }

      if (!isExpanded) {
        const productSales = salesData?.find(
          (item) => item.product_id === row.original.id
        )?.sales;

        const totalSales = productSales
          ? ["monday", "tuesday", "wednesday", "thursday", "friday"].reduce(
              (acc, day) => acc + (productSales[day] ?? 0),
              0
            )
          : 0;

        return (
          <div className="flex items-center justify-center">{totalSales}</div>
        );
      }

      const productSales = salesData?.find(
        (item) => item.product_id === row.original.id
      )?.sales;

      return (
        <div className="grid grid-cols-5 w-full">
          {["monday", "tuesday", "wednesday", "thursday", "friday"].map(
            (day) => (
              <div
                key={day}
                className="border-r p-5 last:border-r-0 rounded-none text-sm w-full h-full text-center"
              >
                {productSales ? productSales[day] ?? 0 : 0}
              </div>
            )
          )}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "profitGroup",
    header: ({ table }) => {
      const dispatch: AppDispatch = useDispatch();
      const isProfitExpanded = useSelector(
        (state: RootState) => state.toggleTableState.isProfitExpanded
      );

      const toggleExpand = () => {
        dispatch(toggleProfitExpand());

        table.reset();
      };
      return (
        <ProfitColumnHeader
          table={table}
          isExpanded={isProfitExpanded}
          toggleExpand={toggleExpand}
        />
      );
    },
    cell: ({ row, table }) => {
      const isExpanded = useSelector(
        (state: RootState) => state.toggleTableState.isProfitExpanded
      );
      if (!isExpanded) {
        return <div className="flex items-center justify-center">{0}</div>;
      }

      return (
        <div className="grid grid-cols-2">
          <div className="p-5 border-r border-solid border-gray-200   rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative text-center">
            {0}
          </div>
          <div className="border-none p-5  rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative text-center">
            {0}
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    id: "actions",
    header: ({ column }) => {
      return (
        <div
          className="h-full py-5 px-4 flex items-center justify-center bg-transparent hover:bg-black/10 transition-all duration-150 shadow-none cursor-pointer"
          title="Add new Column"
        >
          <div className="py-1.5 px-2">
            <Icons.plus className="shrink-0" />
          </div>
        </div>
      );
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
