'use client';

import { useGetStocksMutation } from '@/redux/features/stock/stock.api';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { useGetUserQuery } from '@/redux/features/auth/auth.api';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import data from './data/stocks.json'
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { useCreateStockMutation } from '@/redux/features/stock/stock.api';
// import { startStocksLoading } from '@/redux/features/stock/stock.slice';

export default function StockPage() {
  const { orgId } = useAppSelector((state) => state.auth);
  const [getStock, { data, isLoading, isSuccess }] = useGetStocksMutation();

  useEffect(() => {
    getStock(orgId ?? '160db8736a9d47989381e01a987e4413').unwrap();
  }, [orgId, getStock]);

  console.log(data, 'data', isLoading);

  return (
    <div className='container'>
      {isLoading && data && isSuccess ? (
        <></>
      ) : (
        <DataTable data={data ?? []} columns={columns} />
      )}
    </div>
  );
}
