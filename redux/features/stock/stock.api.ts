import { api } from "@/redux/api";

interface StockBase {
  id: string;
  name: string;
  quantity: number;
  buying_price: number;
  currency_code: string;
  supplier_id: string | null;
  buying_date: string;
  product_id: string;
  status: string;
  user_id: string;
  date_created: string;
  original_quantity: number;
  supplier: null | undefined;
  timeslots: string[];
}

interface CreateStockRequest extends StockBase {
  // Types
}

interface EditStockRequest extends StockBase {
  // Types
}

interface StockResponse extends StockBase {}
interface StockRequest {
  name: string;
  quantity: number;
  buying_price: number;
  currency_code: string;
  supplier_id: string;
  buying_date: string;
  product_id: string;
  organization_id: string;
  date_created: string;
  timeslots: {
    day_of_week: string;
    start: string;
    end: string;
  }[];
}

export const accessControlApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query<StockResponse[], string>({
      query: (organizatiohn_id: string) => ({
        url: `stocks/?organization_id=${organizatiohn_id}`,
        method: "POST",
      }),
      providesTags: ["Stock"],
      keepUnusedDataFor: 3600,
    }),
    editStock: builder.mutation<StockResponse, EditStockRequest>({
      query: (data) => ({
        url: "stocks/edit",
        method: "PUT",
        body: {
          stock_id: data.id,
          ...data,
        },
      }),
      invalidatesTags: ["Stock"],
    }),

    getWeeklySales: builder.query<
      { product_id: string; sales: any }[],
      {
        organization_id: string;
        product_ids: string[];
        date_range_start: string;
      }
    >({
      query: ({ organization_id, product_ids, date_range_start }) => ({
        url: `stocks/weekday-sale?organization_id=${organization_id}&date_range_start=${date_range_start}`,
        method: "POST",
        body: { product_ids },
      }),
      providesTags: (result) =>
        result
          ? result.map(({ product_id }) => ({
              type: "Stock" as const,
              id: product_id,
            }))
          : [{ type: "Stock" as const, id: "LIST" }],
    }),

    addStock: builder.mutation<StockResponse, StockRequest>({
      query: (stockData) => ({
        url: "stocks/create",
        method: "POST",
        body: stockData,
      }),
      invalidatesTags: ["Stock"],
    }),

    // createStock: builder.mutation<
    //   APIResponse<StockResponse>,
    //   CreateStockRequest
    // >({
    //   query: (values) => ({
    //     url: 'stocks',
    //     method: 'POST',
    //     body: values,
    //   }),
    //   invalidatesTags: ['Stock'],
    // }),
    // editStock: builder.mutation<APIResponse<StockResponse>, EditStockRequest>({
    //   query: (values) => ({
    //     url: `stocks/${values.id}`,
    //     method: 'PUT',
    //     body: values,
    //   }),
    //   invalidatesTags: (result) => [{ type: 'Stock', id: result?.data?.id }],
    // }),
    // deleteStock: builder.mutation<void, string>({
    //   query: (id) => ({
    //     url: `stocks/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Stock'],
    // }),
  }),
});

export const {
  // useGetStocksQuery,
  // useCreateStockMutation,
  // useEditStockMutation,
  // useDeleteStockMutation,
  useAddStockMutation,
  useGetWeeklySalesQuery,
  useEditStockMutation,
  useGetStocksQuery,
} = accessControlApi;
