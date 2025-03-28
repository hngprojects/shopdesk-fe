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
  }),
});

export const { useCreateSaleMutation } = salesApi;
