"use client";

import { useGetStocksQuery } from "@/redux/features/stock/stock.api";
import { useStore } from "@/store/useStore";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default function StockPage() {
  const { organizationId } = useStore();
  const { data, isLoading, isError } = useGetStocksQuery(organizationId);

  return (
    <div className="container mx-auto">
      <DataTable
        data={data ?? []}
        columns={columns}
        loading={isLoading}
        error={isError}
      />
    </div>
  );
}
