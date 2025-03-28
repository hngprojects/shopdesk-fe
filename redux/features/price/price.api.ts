import { api } from "@/redux/api";

export interface PriceBase {
  name: string;
  product_id: string;
  stock_id?: string;
  price: number;
  discounted_price: number;
  currency_code?: string;
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
  sunday?: boolean;
  start?: string;
  end?: string;
  customer_group?: string;
  priority?: number;
  is_private?: boolean;
  organization_id: string;
}

export interface GetPricesResponse {
  page: number;
  size: number;
  total: number;
  previous_page: string;
  next_page: string;
  items: PriceBase[];
}

export interface CreatePriceRequest extends PriceBase {}
export interface CreatePriceResponse {
  message: string;
  data: PriceBase;
}

export const pricesApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPrices: builder.query<
        GetPricesResponse,
        { product_id: string; organization_id: string }
      >({
        query: ({ product_id, organization_id }) => ({
          url: "productPrices",
          method: "GET",
          params: {
            product_id,
            organization_id,
          },
        }),
        providesTags: ["Price"],
      }),
      createPrice: builder.mutation<CreatePriceResponse, CreatePriceRequest>({
        query: ({
          name,
          price,
          product_id,
          organization_id,
          discounted_price,
          currency_code,
        }) => ({
          url: "productPrices",
          method: "POST",
          body: {
            name,
            price,
            product_id,
            organization_id,
            currency_code,
            discounted_price: discounted_price || price,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true,
          },
        }),
        invalidatesTags: ["Price"],
      }),
    };
  },
});

export const { useGetPricesQuery, useCreatePriceMutation } = pricesApi;
