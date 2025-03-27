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
  console.log("organizationId", organizationId);

  const [stocks, setStocks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (organizationId) {
      async function fetchData() {
        setLoading(true);
        console.log("start loading", loading);

        setError(null);
        try {
          const response = await fetchStocks(organizationId);
          console.log("mid loading", loading);
          console.log("response", response);

          setStocks(response);
          dispatch(setStocksResponse(response));
        } catch (err) {
          setError(`Failed to fetch stocks ${err}`);
        } finally {
          console.log("end loading", loading);
          setLoading(false);
        }
      }
      fetchData();
    }
  }, [organizationId, dispatch]);

  return (
    <div className="container mx-auto">
      <DataTable
        data={stocks ?? []}
        columns={columns}
        loading={loading}
        error={error}
      />
    </div>
  );
}
