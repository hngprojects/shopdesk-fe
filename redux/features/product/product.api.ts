import { api } from "@/redux/api";

interface ProductPrice {
  [currency: string]: [number, number | null];
}

export type Product = {
  name: string;
  description: string | null;
  unique_id: string;
  url_slug: string;
  is_available: boolean;
  is_service: boolean;
  previous_url_slugs: string | null;
  unavailable: boolean;
  unavailable_start: string | null;
  unavailable_end: string | null;
  status: string;
  id: string;
  parent_product_id: string | null;
  parent: any | null;
  organization_id: string;
  categories: string[];
  date_created: string;
  last_updated: string;
  user_id: string;
  current_price: { [currency: string]: [number, number | null] }[];
  is_deleted: boolean;
  available_quantity: number;
  selling_price: string | null;
  discounted_price: number | null;
  buying_price: number | null;
  photos: string[];
  attributes: Record<string, any>;
};

interface ProductsResponse {
  page: number;
  size: number;
  total: number;
  debug: unknown;
  previous_page: number | null;
  next_page: number | null;
  items: Product[];
}

export const accessControlApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProductsForSale: builder.query<
      ProductsResponse,
      { organization_id: string }
    >({
      query: ({ organization_id }) => ({
        url: `product/get?organization_id=${organization_id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetProductsForSaleQuery } = accessControlApi;
