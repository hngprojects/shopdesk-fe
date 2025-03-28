"use client";
import SalesModal from "@/components/modal/salesmodal/sales-modal";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  useCreateCustomerMutation,
  useGetCustomersQuery,
} from "@/redux/features/customer/customer.api";
import { useGetProductsForSaleQuery } from "@/redux/features/product/product.api";
import { useCreateSaleMutation } from "@/redux/features/sale/sale.api";
import { RootState } from "@/redux/store";
import { useStore } from "@/store/useStore";
import {
  type Column,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { columns, type Sale } from "./components/columns";
import { DataTable } from "./components/data-table";
import { DataTablePagination } from "./components/data-table-pagination";
import { processDataIntoGroups, sampleData } from "./data/data";

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
  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
  };

  useEffect(() => {
    setGroupedData(processDataIntoGroups(sampleData));
  }, []);

  return (
    <React.Fragment>
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
          {/* Tables for each time group */}
          <div className="px-5 pt-5 space-y-6">
            {groupedData.map((group) => (
              <div
                key={group.timeKey}
                className="border border-gray-200 rounded-lg relative "
              >
                <div
                  className={`absolute -top-1 left-54 w-20 h-[5px]  after:w-4 after:h-4 after:border-l after:border-gray-200 after:border-t after:border-solid after:absolute after:content-[''] after:-right-[15px] after:rounded-tl-lg after:top-[3px] bg-white  z-50 ${
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

          {/* Pagination at the bottom */}
          <div className="min-w-[900px] border-t border-b  border-gray-200 rounded-br-lg rounded-bl-lg mt-4">
            <div className="px-4 py-3">
              <DataTablePagination
                table={table}
                viewType={viewType}
                setViewType={setViewType}
              />
            </div>
          </div>
        </div>
      </div>

      <SalesModal
        isOpen={showModal}
        onClose={toggleSalesModal}
        onCompleteSale={completeSale}
        stockItems={stockItems}
      />
    </React.Fragment>
  );
}
