"use client";
import SalesModal from "@/components/modal/salesmodal/sales-modal";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  useCreateCustomerMutation,
  useGetCustomersQuery,
} from "@/redux/features/customer/customer.api";
import { useGetProductsForSaleQuery } from "@/redux/features/product/product.api";
import {
  useCreateSaleMutation,
  useGetSalesQuery,
} from "@/redux/features/sale/sale.api";
import { RootState } from "@/redux/store";
import { useStore } from "@/store/useStore";
import { StockItemResponse } from "@/types/stocks";
import { formatDate } from "@/utils";
import {
  type Column,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { columns, type Sale } from "./components/columns";
import { DataTable } from "./components/data-table";
import { DataTablePagination } from "./components/data-table-pagination";
import EmptySalePage from "./components/empty-sale-page";
import { processDataIntoGroups } from "./data/data";

export default function SalesPage() {
  const [groupedData, setGroupedData] = useState<
    { timeKey: string; items: Sale[]; total: Sale }[]
  >([]);
  const [viewType, setViewType] = React.useState<"Daily" | "Weekly" | "Flat">(
    "Daily"
  );
  const [hoveredRow, setHoveredRow] = useState<{
    tableId: string;
    rowId: string;
  } | null>(null);
  const { organizationId } = useStore();
  const [showModal, setShowModal] = useState(false);

  // Create a table instance for pagination

  const { data: salesData, isFetching: FetchingSalesData } = useGetSalesQuery({
    organization_id: organizationId,
  });

  const formattedSales = salesData?.items?.flatMap((sale) =>
    sale.products_sold.map((product) => {
      const { date, time } = formatDate(product.date_created);

      return {
        id: product.id,
        date,
        time,
        itemName: product.product.name,
        quantitySold: product.quantity,
        sellPrice: product.amount,
        profit: sale.profit,
      };
    })
  );

  const { data: ProductsData, isFetching } = useGetProductsForSaleQuery({
    organization_id: organizationId,
  });
  const { data: customersData, isFetching: isFetchingCustomers } =
    useGetCustomersQuery({
      organization_id: organizationId,
    });

  const [createCustomer, { isLoading: isCreatingCustomer }] =
    useCreateCustomerMutation();
  const [createSale, { isLoading: isCreatingSale }] = useCreateSaleMutation();

  const stockItems = ProductsData?.items ?? [];

  const table = useReactTable({
    data: formattedSales || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedItems = useSelector(
    (state: RootState) => state.sales.selectedItems
  );
  const firstSelectedItemId = selectedItems[0]?.id;

  const handleRowHover = (tableId: string, rowId: string) => {
    setHoveredRow({ tableId, rowId });
  };
  const handleRowLeave = () => {
    setHoveredRow(null);
  };

  const toggleSalesModal = () => {
    setShowModal((prev) => !prev);
  };

  const completeSale = async () => {
    if (!organizationId) return;

    let customer = customersData?.items?.[0]; // Pick the first customer if available

    if (!customer) {
      try {
        const newCustomerResponse = await createCustomer({
          organization_id: organizationId,
        }).unwrap();

        customer = newCustomerResponse.customer;
      } catch (error) {
        console.error("Error creating customer:", error);
        return;
      }
    }

    if (!customer) return;

    // Example products_sold - replace with actual data
    const products_sold = [
      {
        product_id: firstSelectedItemId,
        amount: 100,
        quantity: 1,
        currency_code: "NGN",
      },
    ];

    try {
      const saleResponse = await createSale({
        organization_id: organizationId,
        customer_id: customer.id,
        currency_code: customer.default_currency_code || "USD",
        products_sold,
      }).unwrap();

      console.log("Sale created:", saleResponse);
    } catch (error) {
      console.error("Error creating sale:", error);
    }

    toggleSalesModal();
  };

  const processedSales = useMemo(() => {
    return formattedSales ? processDataIntoGroups(formattedSales) : [];
  }, [formattedSales]);

  useEffect(() => {
    setGroupedData(processedSales);
  }, [processedSales]);

  return (
    <React.Fragment>
      {groupedData.length > 0 && (
        <Button
          variant="outline"
          onClick={toggleSalesModal}
          className="absolute top-35 right-13 max-[400px]:text-sm text-nowrap max-[1000px]:hidden mr-2 disabled:opacity-50 text-black border-black"
        >
          + Add New Sale
        </Button>
      )}
      <div className="pl-1 bg-[#F6F8FA] rounded-tr-lg rounded-bl-lg rounded-br-lg">
        {/* Standalone header */}
        <div className="bg-white border-r rounded-br-lg rounded-bl-lg rounded-tr-lg ">
          <div className="min-w-[900px] border-t border-gray-200 rounded-tr-lg bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={Math.random() * 10000000}>
                      {typeof column.header === "function"
                        ? column.header({
                            column: column as Column<Sale, unknown>,
                            header:
                              typeof column.header === "function"
                                ? column.header({
                                    column: column as Column<Sale, unknown>,
                                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                                    header: {} as any, // Replace with appropriate Header<Sale, unknown> if available
                                    table: table,
                                  })
                                : column.header,
                            table: table,
                          })
                        : column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            </Table>
          </div>

          {groupedData.length === 0 && !FetchingSalesData && (
            <EmptySalePage toggleSalesModal={toggleSalesModal} />
          )}

          {FetchingSalesData && (
            <div className="text-xl text-center w-full flex justify-center gap-3 items-center mt-20">
              <Icons.LoadingIcon /> Getting your sales. Please Wait!
            </div>
          )}

          {/* Tables for each time group */}
          <div className="px-5 pt-5 space-y-6">
            {groupedData.map((group) => (
              <div
                key={group.timeKey}
                className="border border-gray-200 rounded-lg relative "
              >
                <div
                  className={`absolute -top-1 left-54 w-20 h-[5px]  after:w-4 after:h-4 after:border-l after:border-gray-200 after:border-t after:border-solid after:absolute after:content-[''] after:-right-[15px] after:rounded-tl-lg after:top-[3px] bg-white z-50 before:absolute before:-top-[4px] before:content-[""] before:w-2 before:h-2 before:bg-white before:-left-[6px] before:rounded-bl-lg ${
                    hoveredRow?.tableId === group.timeKey
                      ? "after:bg-gray-50 after:shadow-[-1px_-1px_0_rgb(246,_248,_250)]"
                      : " after:bg-white after:shadow-[-3px_-3px_0_rgb(255,_255,_255)]"
                  }`}
                ></div>
                <DataTable
                  data={[group.total, ...group.items]}
                  columns={columns}
                  onRowHover={(rowId) => handleRowHover(group.timeKey, rowId)}
                  onRowLeave={handleRowLeave}
                />
              </div>
            ))}
          </div>

          {groupedData.length > 5 && (
            <div className="min-w-[900px] border-t border-b  border-gray-200 rounded-br-lg rounded-bl-lg mt-4">
              <div className="px-4 py-3">
                <DataTablePagination
                  table={table}
                  viewType={viewType}
                  setViewType={setViewType}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <SalesModal
        isOpen={showModal}
        onClose={toggleSalesModal}
        onCompleteSale={completeSale}
        stockItems={stockItems as unknown as StockItemResponse[]}
      />
    </React.Fragment>
  );
}
