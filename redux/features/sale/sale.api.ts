import { api } from "@/redux/api";

export interface ProductSold {
  product_id: string;
  amount: number;
  quantity: number;
  currency_code: string;
}

export interface CreateSaleRequest {
  organization_id: string;
  customer_id: string;
  currency_code: string;
  products_sold: ProductSold[];
}

export interface CreateSaleResponse {
  message: string;
  sale_id: string;
}

export interface Product {
  id: string;
  name: string;
  organization_id: string;
  unique_id: string;
  description: string | null;
}

export interface Stock {
  id: string;
  supplier: string | null;
}

export interface ProductSoldInSale {
  id: string;
  sale_id: string;
  product_id: string;
  amount: number;
  quantity: number;
  start: string | null;
  end: string | null;
  start_dt: string | null;
  end_dt: string | null;
  day_of_week: string | null;
  buying_price: number;
  discount: number;
  currency_code: string;
  date_created: string;
  last_updated: string;
  product: Product;
  price_id: string | null;
  stock: Stock;
  is_deleted: boolean;
}

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
}

export interface Sale {
  id: string;
  unique_id: string;
  products_sold: ProductSoldInSale[];
  customer_id: string;
  organization_id: string;
  amount: number;
  currency_code: string;
  mode_of_payment: string;
  payment_status: string;
  sales_status: string;
  completion_status: string;
  is_deleted: boolean;
  date_created: string;
  last_updated: string;
  date_created_db: string;
  last_updated_db: string;
  user_id: string;
  customer: Customer;
  profit: number;
}

export interface GetSalesResponse {
  page: number;
  size: number;
  total: number;
  items: Sale[];
}

export const salesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSale: builder.mutation<CreateSaleResponse, CreateSaleRequest>({
      query: ({
        organization_id,
        customer_id,
        currency_code,
        products_sold,
      }) => ({
        url: `sales`,
        method: "POST",
        body: { organization_id, customer_id, currency_code, products_sold },
      }),
      invalidatesTags: ["Sale"],
    }),
    getSales: builder.query<
      GetSalesResponse,
      {
        organization_id: string;
        date_time?: string;
        page?: number;
        size?: number;
        filter?: string;
        my_sales?: boolean;
        sorting_key?: string;
        reverse_sort?: boolean;
        use_db?: boolean;
      }
    >({
      query: ({
        organization_id,
        date_time,
        page = 1,
        size = 50,
        filter = "all",
        my_sales = false,
        sorting_key = "date_created_db",
        reverse_sort = true,
        use_db = true,
      }) => ({
        url: `sales`,
        method: "GET",
        params: {
          organization_id,
          date_time,
          page,
          size,
          filter,
          my_sales,
          sorting_key,
          reverse_sort,
          use_db,
        },
      }),
      providesTags: ["Sale"],
    }),
  }),
});

export const { useCreateSaleMutation, useGetSalesQuery } = salesApi;
