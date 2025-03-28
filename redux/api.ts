import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "../lib/helpers/redux-base-query";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Stock", "User", "Product", "Customer", "Sale", "Price"],
  endpoints: () => ({}),
});
