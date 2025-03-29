import { api } from "@/redux/api";

interface ContactFormRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactFormResponse {
  success?: string;
  error?: string;
}

export const contactApi = api.injectEndpoints({
  endpoints: (builder) => ({
    submitContactForm: builder.mutation<
      ContactFormResponse,
      ContactFormRequest
    >({
      query: (formData) => ({
        url: "/contact",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useSubmitContactFormMutation } = contactApi;
