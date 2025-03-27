"use client";

import { useGetStocksQuery } from "@/redux/features/stock/stock.api";
import { useStore } from "@/store/useStore";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default function StockPage() {
  const { organizationId } = useStore();
  const { data, isFetching, isError } = useGetStocksQuery(organizationId, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="container mx-auto">
      <div className="container mx-auto pl-1 bg-[#F6F8FA] border-l border-solid rounded-bl-[12px]">
        <DataTable
          data={data ?? []}
          columns={columns}
          loading={isFetching}
          error={isError}
        />
      </div>
    </div>
  );
}
