import { api } from "@/redux/api";

export interface Customer {
  id: string;
  unique_id: string;
  user_id: string;
  assigned_user_id: string | null;
  organization_id: string;
  default_currency_code: string | null;
  is_deleted: boolean;
  is_active: boolean;
  amount_owed: number;
  amount_owing: number;
  status: string | null;
  oldest_open_debt: string | null;
  oldest_open_invoice: string | null;
  biz_partner_type: string;
  biz_partner_id: string;
  first_name: string;
  last_name: string;
  customer_group: string | null;
  date_created: string;
  last_updated: string;
  contact_infos: any[];
}

export interface CustomersResponse {
  page: number;
  size: number;
  total: number;
  previous_page: number | null;
  next_page: number | null;
  items: Customer[];
}

export interface CreateCustomerResponse {
  message: string;
  customer: Customer;
}

export const customersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<CustomersResponse, { organization_id: string }>(
      {
        query: ({ organization_id }) =>
          `customers?organization_id=${organization_id}`,
        providesTags: ["Customer"],
      }
    ),

    createCustomer: builder.mutation<
      CreateCustomerResponse,
      { organization_id: string }
    >({
      query: ({ organization_id }) => ({
        url: `customers?organization_id=${organization_id}`,
        method: "POST",
        // body: { organization_id },
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const { useGetCustomersQuery, useCreateCustomerMutation } = customersApi;
