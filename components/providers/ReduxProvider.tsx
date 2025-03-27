"use client";

import { Provider } from "react-redux";

// Adjust the path as necessary
import { store } from "@/redux/store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
