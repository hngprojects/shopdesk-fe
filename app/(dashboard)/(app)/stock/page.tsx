"use client";

import { fetchStocks } from "@/actions/stocks";
import { setStocksResponse } from "@/redux/features/stock/stock.slice";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default function StockPage() {
  const { organizationId } = useStore();
  const [stocks, setStocks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (organizationId) {
      async function fetchData() {
        setLoading(true);
        setError(null);
        try {
          const response = await fetchStocks(organizationId);
          setStocks(response);
          dispatch(setStocksResponse(response));
        } catch (err) {
          setError(`Failed to fetch stocks ${err}`);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }
  }, [organizationId, dispatch]);

  return (
    <div className="container mx-auto pl-1 bg-[#F6F8FA] border-l border-solid rounded-bl-[12px]">
      <DataTable
        data={stocks ?? []}
        columns={columns}
        loading={loading}
        error={error}
      />
    </div>
  );
}
